import {db} from './firebase';

export const createUser = (uid, username, email) => {
  return db
    .ref('users')
    .once('value')
    .then(res => {
      const usersUid = (res.val() === null) ? [] : Object.keys(res.val());
      return usersUid.includes(uid)
        ? null
        : db
          .ref(`users/${uid}`)
          .set({username, email});
    })
}

export const getUser = uid => db
  .ref(`users/${uid}`)
  .once('value')
  .then(res => res.val())