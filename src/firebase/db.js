import {db} from './firebase';

export const createUser = (uid, username, email) => {
  return db
    .ref('users')
    .once('value')
    .then(res => {
      const usersUid = (res.val() === null)
        ? []
        : Object.keys(res.val());
      return usersUid.includes(uid)
        ? null
        : db
          .ref(`users/${uid}`)
          .set({username, email});
    })
}

export const addContact = (uid, contact_uid) => {
  getContacts(uid).then(contacts => {
    if (!contacts) {
      db
        .ref(`contacts/${uid}`)
        .set([contact_uid])
    } else {
      const userContacts = Object.values(contacts)
      userContacts.push(contact_uid)
      db
        .ref(`contacts/${uid}`)
        .set(userContacts)
    }
  })
}

export const removeContact = (uid, contact_uid) => {
  getContacts(uid).then(contacts => {
    const userContacts = Object.values(contacts)
    const updatedUserContacts = userContacts.filter(contact => contact !== contact_uid)
    db
      .ref(`contacts/${uid}`)
      .set(updatedUserContacts)
  })
}

export const getUser = uid => db
  .ref(`users/${uid}`)
  .once('value')
  .then(res => res.val())

export const getContacts = uid => db
  .ref(`contacts/${uid}`)
  .once('value')
  .then(res => res.val())

export const updateUsername = (uid, new_username) => db
  .ref(`users/${uid}/username`)
  .set(new_username)

export const updateUserImage = (uid, new_userImage) => db
  .ref(`users/${uid}/image`)
  .set(new_userImage)