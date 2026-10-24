import { loadCloudSaveModule } from 'virtual:tens-features'

/** Lazily loads the Firebase backend; resolves null (and bundles nothing) when cloud save is off. */
export const loadCloudSave = () => (loadCloudSaveModule ? loadCloudSaveModule() : Promise.resolve(null))

const AUTH_ERROR_MESSAGES = {
  'auth/invalid-credential': 'Email or password is incorrect.',
  'auth/wrong-password': 'Email or password is incorrect.',
  'auth/user-not-found': 'Email or password is incorrect.',
  'auth/invalid-email': 'That email address is not valid.',
  'auth/email-already-in-use': 'An account already exists for that email.',
  'auth/weak-password': 'Use a password of at least 6 characters.',
  'auth/too-many-requests': 'Too many attempts — try again in a few minutes.',
  'auth/network-request-failed': 'No connection — check your network and try again.',
  'auth/requires-recent-login': 'Please enter your password again.',
  'cloud/incompatible-save': 'That cloud save could not be loaded by this version of the game.',
}

export const describeCloudError = code => AUTH_ERROR_MESSAGES[code] ?? 'Something went wrong. Please try again.'
