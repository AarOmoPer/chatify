import {db} from './firebase';

// Create
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

// Read
export const findContact = (key) => db
  .ref('users')
  .orderByChild('email')
  .startAt(key)
  .endAt(`${key}\uf8ff`)
  .once('value')
  .then(res => res.val())

export const getContactsOnce = uid => db
  .ref(`contacts/${uid}`)
  .once('value')
  .then(res => res.val())
export const getContacts = (uid, callBack) => db
  .ref(`contacts/${uid}`)
  .on('value', res => callBack(res.val()))

// Update Delete
export const removeContact = (uid, contact_uid) => {
  getContacts(uid).then(contacts => {
    const userContacts = Object.values(contacts)
    const updatedUserContacts = userContacts.filter(contact => contact !== contact_uid)
    db
      .ref(`contacts/${uid}`)
      .set(updatedUserContacts)
  })
}