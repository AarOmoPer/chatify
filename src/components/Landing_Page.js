import React from 'react';
import {auth} from '../firebase'
import {withRouter} from 'react-router-dom'

class Landing_Page extends React.Component{
  render(){
    const {history} = this.props
    return(
      <section className=''>
        <p>Landing Page</p>
        <button type='button' onClick={() => auth.doSignInWithGoogle().then(() => history.push('/private'))}>Sign in</button>
      </section>
    )
  }
}

export default withRouter(Landing_Page)