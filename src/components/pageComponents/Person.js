import React from 'react';
import {withRouter} from 'react-router-dom'
import {users} from '../../firebase/db'

class Person extends React.Component {
  state = {
    userData: null
  }

  render() {
    const {openState, close, contactData} = this.props
    return (
      <section className=''>
        <div class={`modal ${openState && 'is-active'}`}>
          <div class="modal-background"></div>
          <div class="modal-content">
            <section className='title flex-container'>
              <figure className="image is-256x256 large-picture">
                <img
                  className='round-up large-picture default-user-image'
                  alt=''
                  src={contactData && contactData.image
                  ? contactData.image
                  : ""}/>
              </figure>
            </section>
            <h1 className='title has-text-centered has-text-danger'>{contactData
                ? contactData.username
                : 'Loading'}
            </h1>
            <h1 className='subtitle has-text-centered has-text-white is-6'>{contactData
                ? contactData.email
                : 'Loading'}
            </h1>

            <section className='field is-grouped is-pulled-right'>
              <p className='control'>
                <button className='button is-rounded is-danger' onClick={() => null}>Block</button>
              </p>
              <p className='control'>
                <button className='button is-rounded is-danger' onClick={() => null}>Remove contact</button>
              </p>
            </section>
          </div>
          <button class="modal-close is-large" onClick={close} aria-label="close"></button>
        </div>
      </section>
    )
  }
}

export default withRouter(Person);