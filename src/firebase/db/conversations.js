import {db} from '../firebase';

import {users} from './'

// Create
export const createPrivateConversation = (memberA, memberB) => {
  const privateConversationSchema = {
    type: 'private',
    members: [
      memberA, memberB
    ],
    messages: [],
    lastMessageTime: ''
  }
  const newConversation = db
    .ref(`conversations`)
    .push(privateConversationSchema)
  return newConversation.key
}
// Read
export const getPrivateConversation = (conversationUid, uid, callBack) => db
  .ref(`conversations/${conversationUid}`)
  .on('value', res => {
    const conversationData = res.val();
    const contactUid = conversationData
      .members
      .filter(member => member !== uid)[0]
    users
      .getUserOnce(contactUid)
      .then(userDetails => {
        userDetails.uid = contactUid;
        conversationData.contactData = userDetails;
        return
      })
      .then(() => callBack(conversationData))
  })

// Update

export const sendTextMessage = (uid, conversationUid, message) => db
  .ref(`conversations/${conversationUid}/messages`)
  .push({
    type: 'text',
    body: message,
    createdAt: Date.now(),
    senderUid: uid
  })
  .then(() => db.ref(`conversations/${conversationUid}/lastMessageTime`).set(Date.now()))

// Delete