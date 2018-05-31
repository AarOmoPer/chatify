import React from 'react';
import PropTypes from 'prop-types'
import PersonIcon from '../subComponents/PersonIcon'
import {Link} from 'react-router-dom'

import '../styles/contacts.css'

class Contacts extends React.Component {
  render() {
    const {userContacts} = this.context
    return (
      <section className=''>
        <section className='container'>
          <div class="field has-addons">
            <div class="control is-expanded">
              <input class="input round-up" type="text" placeholder="Search contacts"/>
            </div>
            <div class="control">
              <a class="button round-up is-danger">
                Search
              </a>
            </div>
          </div>
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