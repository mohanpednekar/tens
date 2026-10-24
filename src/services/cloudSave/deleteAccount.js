/**
 * "Delete account and data" (required by Google Play and the App Store for apps with sign-in).
 * Order matters: re-authenticate first (Firebase refuses deleteUser on a stale login), then delete
 * the Firestore save, and only then the Auth user — if the data delete fails the account is kept,
 * so the player can retry instead of being left with orphaned data they can no longer reach.
 */
export const deleteAccountAndData = async ({ reauthenticate, deleteSaveData, deleteAuthUser }) => {
  try {
    await reauthenticate()
  } catch (error) {
    return { ok: false, step: 'reauthenticate', code: error?.code ?? 'unknown' }
  }
  try {
    await deleteSaveData()
  } catch (error) {
    return { ok: false, step: 'delete_data', code: error?.code ?? 'unknown' }
  }
  try {
    await deleteAuthUser()
  } catch (error) {
    return { ok: false, step: 'delete_user', code: error?.code ?? 'unknown' }
  }
  return { ok: true }
}
