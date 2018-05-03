import React from 'react';
import PropTypes from 'prop-types'
import PersonIcon from './PersonIcon'
import {Link} from 'react-router-dom'

import './styles/contacts.css'

class Contacts extends React.Component {
  render() {
    const {userContacts} = this.context
    return (
      <section className=''>
        <section className='contacts-rack'>
          {userContacts && userContacts.map(contact => <PersonIcon {...contact}/>)}
        </section>
        <Link to='private/people'>
          <h1 className=''>Find people</h1>
        </Link>
      </section>
    )
  }
}

Contacts.contextTypes = {
  userContacts: PropTypes.objects
}

export default Contacts;