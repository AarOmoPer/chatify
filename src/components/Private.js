import React from 'react';
import PropTypes from 'prop-types'
import {auth} from '../firebase'
import {withAuthorization} from './higherOrderComponents'

class Private_Page extends React.Component {
  render() {
    const {authUser} = this.context
    return (
      <section>
        <p>Private page</p>
        <p>User: {authUser && authUser.displayName}</p>
        <button type='button' onClick={auth.doSignOut}>Sign out</button>
      </section>
    )
  }
}

Private_Page.contextTypes = {
  authUser: PropTypes.object
}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Private_Page);