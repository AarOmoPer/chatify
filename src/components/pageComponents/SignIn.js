import React from 'react';
import {auth} from '../../firebase'
import {Redirect} from 'react-router-dom'
import {users} from '../../firebase/db'
import PropTypes from 'prop-types'

class SignIn extends React.Component {
  render() {
    const {authUser} = this.context;
    return (
      <section className='hero-body'>
        <section className='container has-text-centered'>
          {authUser
            ? <Redirect to='/private'/>
            : <section>
              <h1 className='title is-size-1'>Chatify</h1>
              <button
                className='button is-danger is-rounded'
                type='button'
                onClick={this.handleSignIn}>Sign in</button>
            </section>}
        </section>
      </section>
    )
  }

  handleSignIn = () => {
    auth
      .doSignInWithGoogle()
      .then(res => {
        const {user} = res
        users.createUser(user.uid, user.displayName, user.email, user.photoURL)
      })
  }
}

SignIn.contextTypes = {
  authUser: PropTypes.object
}

export default SignIn