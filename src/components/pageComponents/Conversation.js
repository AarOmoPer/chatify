import React from 'react';

import PropTypes from 'prop-types'
import {ConversationNav} from '../navBar'
import {conversations} from '../../firebase/db'

import Person from './Person'

import '../styles/conversation.css'

class Conversation extends React.Component {
  state = {
    openContactProfile: false,
    conversationUid: null,
    conversationData: null,
    newMessage: ''
  }

  componentDidMount() {
    const conversationUid = this
      .props
      .location
      .pathname
      .split('/private/conversation/')[1];
    this.setState({conversationUid})
    const {authUser} = this.context
    conversations.getPrivateConversation(conversationUid, authUser.uid, conversationData => this.setState({conversationData}))
  }

  componentDidUpdate(){
    this.scrollToBottom();
  }

  render() {
    const {openContactProfile, conversationData, newMessage, conversationUid} = this.state
    const {authUser} = this.context
    const messages = conversationData
      ? (conversationData.messages
        ? Object.values(conversationData.messages)
        : null)
      : null
    const contactData = conversationData
      ? conversationData.contactData
      : null
    return (
      <section id='convoPage' className=''>
        <Person openState={openContactProfile} contactData={contactData} close={this.closeContactProfile} />
        <ConversationNav
          destination={'/private'}
          openContactProfile={this.openContactProfile}
          displayName={contactData
          ? contactData
            .username
            .split(' ')[0]
          : ''}/>
        <section className='hero-body'>
          <section className='container'>
            <section className=''>
              <section className='conversation-window'>

                {messages && messages.map(message => <p
                  className={`message-block ${ (message.senderUid === authUser.uid) && 'has-text-right'}`}>
                  <span
                    className={`message-bubble has-text-left ${ (message.senderUid === authUser.uid)
                    ? 'is-red has-text-white'
                    : 'light-gray'}`}>
                    {message.body}
                  </span>
                </p>)}

                <div
                  style={{
                  float: "left",
                  clear: "both"
                }}
                  ref={el => {
                  this.messagesEnd = el;
                }}></div>

              </section>

              <section className='navbar is-fixed-bottom'>
                <section className='hero-body is-ice small-top-bottom-padding'>
                  <section className='container'>
                    <article className="media">
                      <div className="media-content">
                        <div className="field">
                          <p className="control">
                            <textarea
                              className="textarea message-input"
                              value={newMessage}
                              onChange={this.updateMessage}
                              placeholder="Write a message..."></textarea>
                          </p>
                        </div>
                      </div>
                      <div className="media-right">
                        <div className="level-left">
                          <div className="level-item">
                            {!!newMessage
                              ? <a
                                  className="button is-danger round-up"
                                  onClick={() => conversations.sendTextMessage(authUser.uid, conversationUid, newMessage).then(() => this.setState({newMessage: ''}))}>Send</a>
                              : <a className="button is-danger round-up" disabled>Send</a>}
                          </div>
                        </div>
                      </div>
                    </article>
                  </section>
                </section>
              </section>
            </section>
          </section>
        </section>
      </section>
    )
  }

  openContactProfile = () => this.setState({openContactProfile: true})
  closeContactProfile = () => this.setState({openContactProfile: false})
  updateMessage = e => this.setState({newMessage: e.target.value})
  scrollToBottom = () => {
    this
      .messagesEnd
      .scrollIntoView({behavior: "instant"});
  }
}

Conversation.contextTypes = {
  authUser: PropTypes.object
}

export default Conversation;