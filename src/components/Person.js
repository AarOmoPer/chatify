import React from 'react';
import {withRouter} from 'react-router-dom'
import {users} from '../firebase/db'

import {BackButton} from './navButtons'

class Person extends React.Component {
  state = {
    userData: null
  }

  componentDidMount = () => {
    const contactUid = this
      .props
      .location
      .pathname
      .split('/private/contact/')[1];
    users
      .getUserOnce(contactUid)
      .then(userData => this.setState({userData}))
  }

  render() {
    const {userData} = this.state;
    return (
      <section className=''>
        <BackButton destination={'/private'}/>
        <section className='hero-body'>
          <section className='container'>
            <section className='title flex-container'>
              <figure className="image is-256x256 large-picture">
                <img
                  className='round-up large-picture default-user-image'
                  alt=''
                  src={userData && userData.image
                  ? userData.image
                  : ""}/>
              </figure>
            </section>
            <h1 className='title has-text-centered has-text-danger'>{userData
                ? userData.username
                : 'Loading'}
            </h1>
            <h1 className='subtitle has-text-centered is-6'>{userData
                ? userData.email
                : 'Loading'}
            </h1>
            
            {/* <button
              className='button is-rounded is-danger is-pulled-right'
              onClick={() => null}>Send request
            </button> */}

            {/* <section className='field is-grouped is-pulled-right'>
              <p className='control'>
                <button className='button is-rounded is-danger' onClick={() => null}>Accept</button>
              </p>
              <p className='control'>
                <button className='button is-rounded is-danger' onClick={() => null}>Decline</button>
              </p>
            </section> */}
          </section>
        </section>
      </section>
    )
  }
}

export default withRouter(Person);