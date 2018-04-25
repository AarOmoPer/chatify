import React from 'react';
import PropTypes from 'prop-types'
import {auth} from '../firebase'
import {getUser} from '../firebase/db'
import {withAuthorization} from './higherOrderComponents'
import {Link} from 'react-router-dom'

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
    getUser(authUser.uid).then(user => this.setState({user}))
  }
  
  render() {
    const {user, view} = this.state;
    return (
      <section className=''>
        <section className='hero-head'>
          <header className="navbar">
            <div className="container">
              <div className="navbar-end">
                <span className="navbar-item is-pulled-right">
                  <p className="control" onClick={auth.doSignOut}>
                    <span className="button is-danger is-rounded">
                      <span className="icon is-small">
                        <i className="fa fa-sign-out"></i>
                      </span>
                      <span>Sign out</span>
                    </span>
                  </p>
                </span>
              </div>
            </div>
          </header>
        </section>

        <section className='hero-body'>
          <section className='container'>
            <section className='title'></section>
            <Link to='/private/profile'>
              <h1 className='title has-text-danger'>{user ? user.username : 'Loading'}</h1>
            </Link>
            <br />
            <Contacts/>
            <button className='button is-danger' onClick={this.toggleView}>Toggle</button>
            {view
              ? <ChatRoom/>
              : <Notification/>}
          </section>
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