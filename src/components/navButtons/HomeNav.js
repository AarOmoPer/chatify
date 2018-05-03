import React from 'react';

import {auth} from '../../firebase'

class HomeNav extends React.Component {
  render() {
    return (
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
    )
  }
}

export default HomeNav