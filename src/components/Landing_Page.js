import React from 'react';
import {auth} from '../firebase'
import {withRouter, Redirect} from 'react-router-dom'
import {doCreateUser} from '../firebase/db'
import withAuthUser from './higher_order_components/withAuthUser';
import PropTypes from 'prop-types'

class Landing_Page extends React.Component{
  render(){
    const {authUser} = this.context
    return(
      <section className=''>
        {authUser ? <Redirect to='/private' /> : <section><p>Landing Page</p>
        <button type='button' onClick={this.handleSignIn}>Sign in</button></section>}
      </section>
    )
  }

  handleSignIn = () => {
    const {history} = this.props
    auth.doSignInWithGoogle().then(res => {
      const user = res.user
      doCreateUser(user.uid, user.displayName, user.email)
      return
    }).then(() => 
      history.push('/private')
    )
  }
}

Landing_Page.contextTypes ={
  authUser: PropTypes.object
}

export default withAuthUser(withRouter(Landing_Page))