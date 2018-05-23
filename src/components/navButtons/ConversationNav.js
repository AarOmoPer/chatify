import React from 'react';
import {Link} from 'react-router-dom'

class ConversationNav extends React.Component {
  render() {
    const {destination, displayName, openContactProfile} = this.props;
    return (
      <section className=''>
        <section className='hero-head'>
          <header className="navbar is-fixed-top">
            <div className="container is-ice">
              <div className="navbar-brand">
                <span className="navbar-item">
                  <Link to={destination || '../'}>
                    <span className="button round-up is-danger">
                      <span className="icon">
                        <i className="fa fa-chevron-circle-left"></i>
                      </span>
                    </span>
                  </Link>
                </span>
                <span className="navbar-item">
                    <a onClick={openContactProfile} className='title is-5'>{displayName}</a>
                </span>
              </div>
            </div>
          </header>
        </section>
      </section>
    )
  }
}

export default ConversationNav;