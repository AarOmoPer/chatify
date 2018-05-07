import {db} from '../firebase';

// --- Create
export const createUser = (uid, username, email, image) => db
  .ref(`users/${uid}`)
  .once('value')
  .then(res => !res.val() && db.ref(`users/${uid}`).set({username, email, image}))

// --- Read
export const getUserOnce = uid => db
  .ref(`users/${uid}`)
  .once('value')
  .then(res => res.val())
export const getUser = (uid, callBack) => db
  .ref(`users/${uid}`)
  .on('value', res => callBack(res.val()))

// --- Update
export const updateUsername = (uid, newUsername) => db
  .ref(`users/${uid}/username`)
  .set(newUsername)
export const updateUserImage = (uid, newUserImage) => db
  .ref(`users/${uid}/image`)
  .set(newUserImage)

// --- Delete
export const deleteUser = uid => db
  .ref(`users/${uid}`)
  .remove()