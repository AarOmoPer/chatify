import {db} from '../firebase';
import {users, conversations} from './'

// Create
export const acceptContactRequest = (uid, senderUid) => {
  const conversationKey = conversations.createPrivateConversation(uid, senderUid);
  db
    .ref(`contacts/${uid}`)
    .push({contactUid: senderUid, conversationUid: conversationKey})
  db
    .ref(`contacts/${senderUid}`)
    .push({contactUid: uid, conversationUid: conversationKey})

  deleteContactRequestFromRecipient(uid, senderUid)
}

export const deleteContactRequestFromRecipient = (uid, senderUid) => {
  db
    .ref(`requests/${uid}/received`)
    .orderByChild('sender')
    .equalTo(senderUid)
    .once('value')
    .then(res => Object.keys(res.val())[0])
    .then(key => db.ref(`requests/${uid}/received/${key}`).remove())
  db
    .ref(`requests/${senderUid}/pending`)
    .orderByChild('target')
    .equalTo(uid)
    .once('value')
    .then(res => Object.keys(res.val())[0])
    .then(key => db.ref(`requests/${senderUid}/pending/${key}`).remove())
}

export const deleteContactRequestFromSender = (uid, targetUid) => {
  db
    .ref(`requests/${uid}/pending`)
    .orderByChild('target')
    .equalTo(targetUid)
    .once('value')
    .then(res => Object.keys(res.val())[0])
    .then(key => db.ref(`requests/${uid}/pending/${key}`).remove())
  db
    .ref(`requests/${targetUid}/received`)
    .orderByChild('sender')
    .equalTo(uid)
    .once('value')
    .then(res => Object.keys(res.val())[0])
    .then(key => db.ref(`requests/${targetUid}/received/${key}`).remove())
}

export const sendContactRequest = (uid, targetUid) => {
  db
    .ref(`requests/${targetUid}/received`)
    .push({sender: uid})
  db
    .ref(`requests/${uid}/pending`)
    .push({target: targetUid})
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
  .then(res => Object.values(res.val()))
  .then(rawContacts => rawContacts
    ? Promise.all(rawContacts.map(contact => users.getUserOnce(contact.contactUid).then(userDetails => Object.assign(userDetails, contact))))
    : [])

export const getContacts = (uid, callBack) => db
  .ref(`contacts/${uid}`)
  .on('value', res => {
    const rawContacts = res.val()
      ? Object.values(res.val())
      : [];
    Promise
      .all(rawContacts.map(contact => users.getUserOnce(contact.contactUid).then(userDetails => Object.assign(userDetails, contact))))
      .then(refinedContacts => callBack(refinedContacts))
  })

export const getContactRequests = (uid, callBack) => db
  .ref(`requests/${uid}`)
  .on('value', res => {
    const contactRequests = res.val();
    const pending = (contactRequests && contactRequests.pending)
      ? Promise.all(Object.values(contactRequests.pending).map(request => users.getUserOnce(request.target).then(userDetails => Object.assign(userDetails, request))))
      : null;
    const received = (contactRequests && contactRequests.received)
      ? Promise.all(Object.values(contactRequests.received).map(request => users.getUserOnce(request.sender).then(userDetails => Object.assign(userDetails, request))))
      : null;
    Promise
      .all([pending, received])
      .then(res => callBack({pending: res[0], received: res[1]}))
  })

// Delete

export const removeContact = (uid, contactUid, conversationUid) => {
  db
    .ref(`contacts/${uid}`)
    .orderByChild('contactUid')
    .equalTo(contactUid)
    .once('value')
    .then(res => Object.keys(res.val())[0])
    .then(key => db.ref(`contacts/${uid}/${key}`).remove())
  db
    .ref(`contacts/${contactUid}`)
    .orderByChild('contactUid')
    .equalTo(uid)
    .once('value')
    .then(res => Object.keys(res.val())[0])
    .then(key => db.ref(`contacts/${contactUid}/${key}`).remove())
  db
    .ref(`conversations/${conversationUid}`)
    .remove()
}