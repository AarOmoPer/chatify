import React from 'react';
import PropTypes from 'prop-types'
import PersonIcon from './PersonIcon'
import {Link} from 'react-router-dom'

import '../styles/contacts.css'

class Contacts extends React.Component {
  render() {
    const {userContacts} = this.context
    return (
      <section className=''>
        <section className='container'>
          <Link className='' to='private/people'>
            <h1 className='has-text-danger'>
              <i class="fa fa-plus-circle"></i>
              &nbsp;Find new people
            </h1>
          </Link>
        </section>
        <br/>
        <section className='container'>
          {userContacts && userContacts.map(contact => <PersonIcon {...contact}/>)}
        </section>
      </section>
    )
  }
}

Contacts.contextTypes = {
  userContacts: PropTypes.object
}

export default Contacts;