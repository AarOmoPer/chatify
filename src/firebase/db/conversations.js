import {db} from '../firebase';

// Create
export const createPrivateConversation = (memberA, memberB) => {
  const privateConversationSchema = {
    type: 'private',
    members: [memberA, memberB],
    messages: [],
    lastMessageTime: ''
  }
  const newConversation = db.ref(`conversations`).push(privateConversationSchema)
  return newConversation.key
}
// Read

// Update

// Delete