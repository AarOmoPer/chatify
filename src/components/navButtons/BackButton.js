import React from 'react';
import {Link} from 'react-router-dom'

class BackButton extends React.Component {
  render() {
    const {destination} = this.props;
    return (
      <section className=''>
        <section className='hero-head'>
          <header className="navbar is-fixed-top">
            <div className="container">
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
              </div>
            </div>
          </header>
        </section>
      </section>
    )
  }
}

export default BackButton;