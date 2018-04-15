import React from 'react';
import PropTypes from 'prop-types'
import {auth} from '../firebase'
import {getUser} from '../firebase/db'
import {withAuthorization} from './higherOrderComponents'

import Contacts from './Contacts'
import ChatRoom from './ChatRoom'
import Notification from './Notification'

class Private extends React.Component {
  state = {
    user: null,
    view: true
  }

  componentDidMount() {
    const {authUser} = this.context
    setTimeout(() => {
      getUser(authUser.uid).then(user => this.setState({user}))
    }, 400);
  }

  render() {
    const {user, view} = this.state;
    return (
      <section className='hero-body'>
        <section className='container'>
          <section className='title'>
            <p className="control" onClick={auth.doSignOut}>
              <a className="button is-danger">
                <span className="icon is-small">
                  <i className="fa fa-sign-out"></i>
                </span>
                <span>Sign out</span>
              </a>
            </p>
          </section>
          <h1 className='title'>{user && user.username}</h1>
          <p><Contacts/></p>
          <button className='button is-danger' onClick={this.toggleView}>Toggle</button>
          {view
            ? <ChatRoom/>
            : <Notification/>}
        </section>
      </section>
    )
  }

  toggleView = () => this.setState({
    view: !this.state.view
  })
}

Private.contextTypes = {
  authUser: PropTypes.object
}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Private);