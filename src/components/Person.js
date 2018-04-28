import React from 'react';
import {withRouter} from 'react-router-dom'
import {getUser} from '../firebase/db'

import BackButton from './BackButton'

class Person extends React.Component {
  state = {
    userData: null
  }

  componentDidMount(){
    const contactUid = this.props.location.pathname.split('/private/contact/')[1];
    getUser(contactUid).then(userData => this.setState({userData}))
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
            <h1 className='title has-text-centered has-text-danger'>{userData && userData.username}</h1>
            <h1 className='subtitle has-text-centered is-6'>{userData && userData.email}</h1>
          </section>
        </section>
      </section>
    )
  }
}

export default withRouter(Person);