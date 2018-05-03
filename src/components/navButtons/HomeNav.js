import React from 'react';
import PropTypes from 'prop-types'
import {auth} from '../../firebase'
import {Link} from 'react-router-dom'

class HomeNav extends React.Component {
  state = {
    menuView: false
  }
  render() {
    const {userDetails, contactRequests} = this.context;
    const {menuView} = this.state
    const requestCount = contactRequests
      ? Object
        .keys(contactRequests)
        .length
      : 0
    return (
      <section className='hero-head'>
        <nav class="navbar is-fixed-top">
          <section className='container is-plain-white'>
            <div class="navbar-brand">
              <Link class="navbar-item" to='/private/profile'>
                <h1 className='title is-4 has-text-danger'>{userDetails && userDetails
                    .username
                    .split(' ')[0]}</h1>
              </Link>
              {!!requestCount && <h1 class="navbar-item">
                <h2 class='subtitle'>
                  <i className="fa fa-user-circle"></i>
                  <sub className='has-text-danger is-size-6'>{requestCount}</sub>
                </h2>
              </h1>}
              <div
                class="navbar-burger burger"
                onClick={this.toggleMenu}
                data-target="navbarExampleTransparentExample">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <div class={`navbar-menu ${menuView && 'is-active'}`}>
              <div class="navbar-end">
                <div class="navbar-item">
                  <div class="field is-grouped">
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
  userDetails: PropTypes.object
}

export default HomeNav