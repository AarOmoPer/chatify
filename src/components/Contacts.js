import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {getContacts, addContact, removeContact} from '../firebase/db'

class Contacts extends React.Component{
  state = {
    contacts: [{name: 'Bob'}, {name: 'Sally'}]
  }

  componentDidMount(){
    const {authUser} = this.context
    getContacts(authUser.uid).then(console.log)
  }

  render(){
    const {contacts} = this.state 
    return(
      <section className=''>
        <Link to='private/people'><a className=''>Find people</a></Link>
        <br />
        <br />
        {/* <input /> <button>Search</button> */}
        {/* <ul>
          {contacts.map(contact => <li>{contact.name}</li>)}
        </ul> */}
      </section>
    )
  }
}

Contacts.contextTypes = {
  authUser: PropTypes.object
}

export default Contacts;