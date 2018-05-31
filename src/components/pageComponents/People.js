import React from 'react';
import PropTypes from 'prop-types'
import {BackButton} from '../navBar'

import PersonMin from '../subComponents/PersonMin'
import {contacts} from '../../firebase/db'

class People extends React.Component {
  state = {
    searchTerm: '',
    searchResults: {}
  }
  render() {
    const {searchTerm, searchResults} = this.state;
    const {authUser} = this.context;
    const searchResultsKeys = Object.keys(searchResults);
    return (
      <section className=''>
        <BackButton destination='/private'/>
        <section className='hero-body'>
          <section className='container'>
            <section className='title'>
              <input
                className='input round-up'
                onChange={this.updateSearchTerm}
                value={searchTerm}
                placeholder='Find people by email...'/>
            </section>
            {searchResultsKeys.length
              ? searchResultsKeys.map(key => <PersonMin
                userUid={key}
                userData={searchResults[key]}
                isNotMe={key !== authUser.uid}/>)
              : <h1 className='has-text-danger'>There are no users fitting your search term.</h1>}
          </section>
        </section>
      </section>
    )
  }
  updateSearchTerm = event => {
    const searchTerm = event.target.value
    this.setState({searchTerm})
    searchTerm
      ? contacts
        .findContact(searchTerm)
        .then(users => this.setState({
          searchResults: users || {}
        }))
      : this.setState({searchResults: {}})
  }
}

People.contextTypes = {
  authUser: PropTypes.object
}

export default People