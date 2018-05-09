import React from 'react';

import PropTypes from 'prop-types'
import {ConversationNav} from './navButtons'
import {conversations} from '../firebase/db'

import './styles/conversation.css'

class Conversation extends React.Component {
  state = {
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

  render() {
    const {conversationData, newMessage, conversationUid} = this.state
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
        <ConversationNav
          destination={'/private'}
          displayName={contactData
          ? contactData
            .username
            .split(' ')[0]
          : ''}/>
        <section className='hero-body' onLoad={() => window.scrollTo(0, 1000)}>
          <section className='container'>
            <section className=''>
              <section className='conversation-window'>

                {messages && messages.map(message => <p className={`message-block ${(message.senderUid === authUser.uid) && 'has-text-right'}`}>
                  <span className='message-bubble'>
                    {message.body}
                  </span>
                </p>)}
              </section>

              <section className='navbar is-fixed-bottom'>
                <section className='hero-body is-ice small-top-bottom-padding'>
                  <section className='container'>
                    <article className="media">
                      <div className="media-content">
                        <div className="field">
                          <p className="control">
                            <textarea
                              className="textarea no-outline"
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

  updateMessage = e => this.setState({newMessage: e.target.value})
}

Conversation.contextTypes = {
  authUser: PropTypes.object
}

export default Conversation;