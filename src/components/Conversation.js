import React from 'react';

import PropTypes from 'prop-types'
import {BackButton} from './navButtons'
import {conversations} from '../firebase/db'

class Conversation extends React.Component {
  state = {
    conversationData: null
  }

  componentDidMount() {
    const conversationUid = this
      .props
      .location
      .pathname
      .split('/private/conversation/')[1];
    const {authUser} = this.context
    conversations.getPrivateConversation(conversationUid, authUser.uid, conversationData => this.setState({conversationData}))
  }

  render() {
    const {conversationData} = this.state
    const contactData = conversationData
      ? conversationData.contactData
      : null
    return (
      <section className=''>
        <BackButton destination={'/private'}/>
        <section className='hero-body'>
          <section className='container'>
            <section className=''>
              <article className="media">
                <figure className="media-left">
                  <p className="image is-64x64">
                    <img
                      className='round-up default-user-image tiny-picture'
                      src={contactData && contactData.image}
                      alt=''/>
                  </p>
                </figure>
                <div className="media-content">
                  <div className="content">
                    {contactData && <section className=''>
                      <h1 className='title is-3'>{contactData.username}</h1>
                      <h1 className='subtitle is-5 has-text-weight-normal has-text-danger'>{contactData.email}</h1>
                    </section>}
                  </div>
                </div>
              </article>
              <section className='card'>
                Hello
              </section>
            </section>
          </section>
        </section>

        <section className='hero-foot'>
          <section className='hero-body'>
            <section className='container'>
              <article class="media">
                <div class="media-content">
                  <div class="field">
                    <p class="control">
                      <textarea class="textarea" placeholder="Write a message..."></textarea>
                    </p>
                  </div>
                </div>
                <div class="media-right">
                  <div class="level-left">
                    <div class="level-item">
                      <a class="button is-danger round-up">Send</a>
                    </div>
                  </div>
                </div>
              </article>
            </section>
          </section>
        </section>
      </section>
    )
  }
}

Conversation.contextTypes = {
  authUser: PropTypes.object
}

export default Conversation;