import React from 'react';
import PropTypes from 'prop-types'
import PersonIcon from './PersonIcon'
import {Link} from 'react-router-dom'

import './styles/contacts.css'

class Contacts extends React.Component {
  render() {
    const tempStyle = {
      'white-space': 'nowrap',
      'width': '200px',
      overflow: 'hidden',
      'text-overflow': 'hidden',
    }
    const {userContacts} = this.context
    return (
      <section className=''>
        <Link className={'box'} to='private/people'>
          <h1 className=''>Find people</h1>
        </Link>
        {userContacts && userContacts.map(contact => <PersonIcon {...contact}/>)}
        {userContacts && userContacts.map(contact => <PersonIcon {...contact}/>)}
      </section>
    )
  }
}

Contacts.contextTypes = {
  userContacts: PropTypes.object
}

export default Contacts;