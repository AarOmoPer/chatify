import React from 'react';

import {auth} from '../firebase'
import {Link} from 'react-router-dom'

import Contacts from './Contacts'
import ChatRoom from './ChatRoom'
import Notification from './Notification'

class Home extends React.Component{
  state = {
    view: false
  }
  render(){
    const {view} = this.state;
    const {userData} = this.props;
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
              <h1 className='title has-text-danger'>{userData.username || 'Loading'}</h1>
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

export default Home