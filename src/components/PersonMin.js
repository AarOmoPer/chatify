import React from 'react';
import PropTypes from 'prop-types';
import {contacts} from '../firebase/db'
import {Link} from 'react-router-dom'

class PersonMin extends React.Component {
  render() {
    const {userUid, userData} = this.props
    const {username, email, image} = userData
    const {authUser, userContacts, userContactRequests} = this.context
    const pendingRequests = userContactRequests.pending
      ? Object
        .values(userContactRequests.pending)
        .map(val => val.target)
      : []
    const receivedRequests = userContactRequests.received
      ? Object
        .values(userContactRequests.received)
        .map(val => val.sender)
      : []

    const isMe = (authUser.uid === userUid)
    const isAlreadyContact = userContacts
      .map(contact => contact.contactUid)
      .includes(userUid)
    const isPending = pendingRequests.includes(userUid)
    const isAwaitingResponse = receivedRequests.includes(userUid)

    const conversationUid = isAlreadyContact
      ? userContacts.filter(contact => contact.contactUid === userUid)[0].conversationUid
      : null;
      
    return (
      <div to={`/private/contact/${userUid}`} className='title'>
        <div className="box">
            <div className="media">
              <Link className="media-left" to={`/private/contact/${userUid}`}>
                <figure className="image is-96x96">
                  <img className='round-up small-picture default-user-image' src={image} alt=""/>
                </figure>
              </Link>
              <div className="media-content">
                <p className="title is-5">{username}</p>
                <p className="subtitle is-7">{email}</p>

                {!isMe && <section>
                  {isAlreadyContact && <section>
                    <button
                      className='button is-rounded is-danger is-pulled-right'
                      onClick={() => contacts.removeContact(authUser.uid, userUid, conversationUid)}>Remove contact</button>
                  </section>}

                  {isPending && <section>
                    <button
                      className='button is-rounded is-danger is-pulled-right'
                      onClick={() => contacts.deleteContactRequestFromSender(authUser.uid, userUid)}>Cancel request</button>
                  </section>}

                  {isAwaitingResponse && <section className='field is-grouped is-pulled-right'>
                    <p className='control'>
                      <button
                        className='button is-rounded is-danger'
                        onClick={() => contacts.acceptContactRequest(authUser.uid, userUid)}>Accept</button>
                    </p>
                    <p className='control'>
                      <button
                        className='button is-rounded is-danger'
                        onClick={() => contacts.deleteContactRequestFromRecipient(authUser.uid, userUid)}>Decline</button>
                    </p>
                  </section>}

                  {(!isAlreadyContact && !isPending && !isAwaitingResponse) && <section>
                    <button
                      className='button is-rounded is-danger is-pulled-right'
                      onClick={() => contacts.sendContactRequest(authUser.uid, userUid)}>Send request</button>
                  </section>}
                </section>}
              </div>
            </div>
        </div>
      </div>
    )
  }

}

PersonMin.contextTypes = {
  authUser: PropTypes.object,
  userContacts: PropTypes.object,
  userContactRequests: PropTypes.object
}
export default PersonMin