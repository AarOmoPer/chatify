import React from 'react';
import PropTypes from 'prop-types'
import PersonIcon from './PersonIcon'
import {Link} from 'react-router-dom'
import {getContacts, getUser} from '../firebase/db'

import './styles/contacts.css'

class Contacts extends React.Component{
  state = {
    contacts: null
  }

  componentDidMount(){
    const {authUser} = this.context
    getContacts(authUser.uid).then(contactsUid => contactsUid && Promise.all(contactsUid.map(contact => getUser(contact)))).then(contacts => this.setState({contacts}))
  }
  
  render(){
    const {contacts} = this.state
    return(
      <section className=''>
        <section className='contacts-rack'>
          {contacts && contacts.map(contact => <PersonIcon {...contact}/>)}
        </section>
        <Link to='private/people'><h1 className=''>Find people</h1></Link>
        <br />
        <br />
        {/* <input /> <button>Search</button> */}
        {/* <ul>
          
        </ul> */}
      </section>
    )
  }
}

Contacts.contextTypes = {
  authUser: PropTypes.object
}

export default Contacts;