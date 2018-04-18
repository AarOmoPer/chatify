import React from 'react';

import BackButton from './BackButton'

class People extends React.Component {
  render() {
    return (
      <section className=''>
        <BackButton destination='/private'/>
        <section className='hero-body'>
          <section className='container'>
            <section className='columns'>
              <section className='column is-four-fifths'>
                <input className='input' placeholder='Find people by username or email...'/>
              </section>
              <section className='column is-one-fifths'>
                <section className='flex-container'>
                  <p className="control">
                    <a className="button is-danger is-rounded">
                      <span className="icon">
                        <i className="fa fa-search"></i>
                      </span>
                      <span>Search</span>
                    </a>
                  </p>
                </section>
              </section>              
            </section>
          </section>
        </section>
      </section>
    )
  }
}

export default People