import React from 'react';
import PropTypes from 'prop-types'
import {auth} from '../../firebase'
import {Link} from 'react-router-dom'

class HomeNav extends React.Component {
  state = {
    menuView: false
  }
  render() {
    const {userDetails, userContactRequests} = this.context;
    const {menuView} = this.state
    const requestCount = (userContactRequests && userContactRequests.received)
      ? userContactRequests.received.length
      : 0
    return (
      <section className='hero-head'>
        <nav className="navbar is-fixed-top">
          <section className='container is-ice'>
            <div className="navbar-brand">
              <Link className="navbar-item" to='/private/profile'>
                <h1 className='title is-4 has-text-danger'>{userDetails && userDetails
                    .username
                    .split(' ')[0]}</h1>
              </Link>
              {userDetails && <Link className="navbar-item" to={'/private/requests'}>
                <h2 className='title is-4 has-text-danger'>
                  <i className="fa fa-user-circle"></i>
                  {!!requestCount && <sub className='has-text-danger is-size-6'>{requestCount}</sub>}
                </h2>
              </Link>}
              <div
                className="navbar-burger burger"
                onClick={this.toggleMenu}
                data-target="navbarExampleTransparentExample">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <div className={`navbar-menu ${menuView && 'is-active'}`}>
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="field is-grouped">
                    <p className="control" onClick={auth.doSignOut}>
                      <span className="button is-danger is-rounded">
                        <span className="icon is-small">
                          <i className="fa fa-sign-out"></i>
                        </span>
                        <span>Sign out</span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </nav>
      </section>
    )
  }

  toggleMenu = () => this.setState({
    menuView: !this.state.menuView
  })
}

HomeNav.contextTypes = {
  userDetails: PropTypes.object,
  userContactRequests: PropTypes.object
}

export default HomeNav