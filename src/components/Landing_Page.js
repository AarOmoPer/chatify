import React from 'react';
import {auth} from '../firebase'
import {withRouter} from 'react-router-dom'
import {doCreateUser} from '../firebase/db'

class Landing_Page extends React.Component{
  render(){
    return(
      <section className=''>
        <p>Landing Page</p>
        <button type='button' onClick={this.handleSignIn}>Sign in</button>
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

export default withRouter(Landing_Page)