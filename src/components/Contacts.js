import React from 'react';
import PropTypes from 'prop-types'
import PersonIcon from './PersonIcon'
import {Link} from 'react-router-dom'
import {getContacts, getUser} from '../firebase/db'

import './styles/contacts.css'

class Contacts extends React.Component{
  state = {
    contacts: null,
    contactsUid: null
  }

  componentDidMount(){
    const {authUser} = this.context
    getContacts(authUser.uid).then(contactsUid => {
      this.setState({contactsUid})
      contactsUid && Promise.all(contactsUid.map(contact => getUser(contact))).then(contacts => this.setState({contacts}))
    })
  }
  
  render(){
    const {contacts} = this.state
    return(
      <section className=''>
        <section className='contacts-rack'>
          {contacts && contacts.map((contact, ind) => <Link to={`private/contact/${this.state.contactsUid[ind]}`}><PersonIcon {...contact}/></Link>)}
        </section>
        <Link to='private/people'><h1 className=''>Find people</h1></Link>
        <br />
        <br />
      </section>
    )
  }
}

Contacts.contextTypes = {
  authUser: PropTypes.object
}

export default Contacts;