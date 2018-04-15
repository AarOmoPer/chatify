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

  componentDidMount(){
    const {authUser} = this.context
    setTimeout(() => {
      getUser(authUser.uid).then(user => this.setState({user}))
    }, 400);
  }

  render() {
    const {user, view} = this.state;
    return (
      <section>
        <button type='button' onClick={auth.doSignOut}>Sign out</button>
        <p>User: {user && user.username + ', ' + user.email}</p>
        <p><Contacts /></p>
        <button onClick={this.toggleView}>Toggle</button>
        <p>{view ? <ChatRoom /> : <Notification />}</p>
      </section>
    )
  }

  toggleView = () => this.setState({view: !this.state.view})
}

Private.contextTypes = {
  authUser: PropTypes.object
}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Private);