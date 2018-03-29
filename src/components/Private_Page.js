import React from 'react';
import PropTypes from 'prop-types'
import {auth} from '../firebase'
import withAuthorization from './higher_order_components/withAuthorization'
import withAuthUser from './higher_order_components/withAuthUser';

class Private_Page extends React.Component {
  render() {
    const authUser = {...this.context.authUser}
    return (
      <section className=''>
        <p>Private page</p>
        <p>User: {authUser && authUser.displayName}</p>
        <button type='button' onClick={() => auth.doSignOut()}>Sign out</button>
      </section>
    )
  }
}

Private_Page.contextTypes = {
  authUser: PropTypes.object
}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(withAuthUser(Private_Page));