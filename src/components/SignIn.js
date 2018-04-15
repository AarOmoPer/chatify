import React from 'react';
import {auth} from '../firebase'
import {Redirect} from 'react-router-dom'
import {createUser} from '../firebase/db'
import PropTypes from 'prop-types'

class SignIn extends React.Component {
  render() {
    const {authUser} = this.context;
    return (
      <section>
        {authUser
          ? <Redirect to='/private'/>
          : <section>
            <p>Chatify</p>
            <button type='button' onClick={this.handleSignIn}>Sign in</button>
          </section>}
      </section>
    )
  }

  handleSignIn = () => {
    auth
      .doSignInWithGoogle()
      .then(res => {
        const user = res.user
        createUser(user.uid, user.displayName, user.email)
      })
  }
}

SignIn.contextTypes = {
  authUser: PropTypes.object
}

export default SignIn