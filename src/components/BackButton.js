import React from 'react';
import {Link} from 'react-router-dom'

class BackButton extends React.Component {
  render() {
    const {destination} = this.props;
    return (
      <section className=''>
        <section className='hero-head'>
          <header class="navbar">
            <div class="container">
              <div class="navbar-brand">
                <a class="navbar-item">
                  <Link to={destination}>
                    <a class="button round-up is-danger">
                      <span class="icon">
                        <i class="fa fa-chevron-circle-left"></i>
                      </span>
                    </a>
                  </Link>
                </a>
              </div>
            </div>
          </header>
        </section>
      </section>
    )
  }
}

export default BackButton;