import React from 'react';
import PropTypes from 'prop-types'
import {BackButton} from './navButtons'

import PersonMin from './PersonMin'
import {users} from '../firebase/db'

class People extends React.Component {
  state = {
    contacts: null,
    searchTerm: '',
    searchResults: {}
  }

  componentDidMount(props){
    const {authUser} = this.context
    users.getContacts(authUser.uid).then(contacts => this.setState({contacts: contacts || ['']}))
  }

  render() {
    const {searchTerm, searchResults, contacts} = this.state;
    const {authUser} = this.context;
    const searchResultsData = Object.values(searchResults);
    return (
      <section className=''>
        <BackButton destination='/private'/> {authUser && <section className='hero-body'>
          {contacts && <section className='container'>
            <section className='title'>
              <input
                className='input'
                onChange={this.updateSearchTerm}
                value={searchTerm}
                placeholder='Find people by email...'/>
            </section>
            {!searchResultsData.length && <h1 className='has-text-danger'>There are no users fitting your search term.</h1>}
            {searchResultsData.map((person, ind) => {
              const userUid = Object.keys(searchResults)[ind];
              return <PersonMin
                {...person}
                key={ind}
                canAdd={userUid !== authUser.uid}
                canRemove={contacts.includes(userUid)}
                userUid={userUid}
                updateContacts={this.updateContacts}
                authUserUid={authUser.uid}/>
            })}
          </section>}
        </section>}
      </section>
    )
  }

  updateSearchTerm = event => {
    const searchTerm = event.target.value
    this.setState({searchTerm})
    searchTerm
      ? users.findContact(searchTerm).then(users => this.setState({
        searchResults: users || {}
      }))
      : this.setState({searchResults: {}})
  }

  updateContacts = () => {
    // const {authUser} = this.context
    // setTimeout(() => getContacts(authUser.uid).then(contacts => this.setState({contacts})), 400)
  }
}

People.contextTypes = {
  authUser: PropTypes.object
}

export default People