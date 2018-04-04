import React from 'react';
import PropTypes from 'prop-types'
import {auth} from '../firebase'
import {getUser} from '../firebase/db'
import {withAuthorization} from './higherOrderComponents'

class Private extends React.Component {
  state = {
    user: null
  }

  componentDidMount(){
    const {authUser} = this.context
    setTimeout(() => {
      getUser(authUser.uid).then(user => this.setState({user}))
    }, 400);
  }

  render() {
    const {user} = this.state;
    return (
      <section>
        <p>Private page</p>
        <p>User: {user && user.username}</p>
        <p>Email: {user && user.email}</p>
        <button type='button' onClick={auth.doSignOut}>Sign out</button>
      </section>
    )
  }
}

Private.contextTypes = {
  authUser: PropTypes.object
}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Private);