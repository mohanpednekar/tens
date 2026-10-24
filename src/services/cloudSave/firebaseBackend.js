import { initializeApp } from 'firebase/app'
import {
  EmailAuthProvider,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  deleteUser,
  indexedDBLocalPersistence,
  initializeAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { deleteDoc, doc, getDoc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore'
import { FIREBASE_CONFIG } from 'services/config'
import { deleteAccountAndData } from './deleteAccount'

// Loaded only when CLOUD_SAVE_ENABLED (services/config.js). Email/password auth runs entirely in
// the Firebase JS SDK, so the same code works on GitHub Pages and inside the Capacitor WebViews
// (https://localhost on Android, capacitor://localhost on iOS) with no native plugin. initializeAuth
// with explicit persistence (instead of getAuth) skips the popup/redirect iframe resolver, which
// never loads inside a Capacitor WebView and would otherwise stall auth start-up on iOS.
//
// Firestore layout: saves/{uid} = { payload: <save JSON string>, schemaVersion, platform, updatedAt }.
// firestore.rules restricts every document to its owner.

const app = initializeApp(FIREBASE_CONFIG)
const auth = initializeAuth(app, { persistence: [indexedDBLocalPersistence, browserLocalPersistence] })
const db = getFirestore(app)

const saveDocFor = uid => doc(db, 'saves', uid)

const requireUser = () => {
  if (!auth.currentUser) throw Object.assign(new Error('Not signed in'), { code: 'auth/no-current-user' })
  return auth.currentUser
}

export const onUserChange = listener => onAuthStateChanged(auth, user => listener(user ? { uid: user.uid, email: user.email } : null))

export const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password)
export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password)
export const signOutUser = () => signOut(auth)
export const resetPassword = email => sendPasswordResetEmail(auth, email)

export const uploadSave = async ({ payload, schemaVersion, platform }) => {
  const user = requireUser()
  await setDoc(saveDocFor(user.uid), { payload, schemaVersion, platform, updatedAt: serverTimestamp() })
}

export const downloadSave = async () => {
  const user = requireUser()
  const snapshot = await getDoc(saveDocFor(user.uid))
  if (!snapshot.exists()) return null
  const data = snapshot.data()
  return { payload: data.payload, updatedAt: data.updatedAt?.toDate?.() ?? null }
}

export const deleteAccount = password => {
  const user = auth.currentUser
  if (!user) return Promise.resolve({ ok: false, step: 'reauthenticate', code: 'auth/no-current-user' })
  return deleteAccountAndData({
    reauthenticate: () => reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, password)),
    deleteSaveData: () => deleteDoc(saveDocFor(user.uid)),
    deleteAuthUser: () => deleteUser(user),
  })
}
