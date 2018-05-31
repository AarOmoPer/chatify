import React from 'react';
import { withAuthorization, withUserData } from './higherOrderComponents'
import { Route } from 'react-router-dom'

import { Home, Profile, People, Person, Requests, Conversation } from './pageComponents'

class Private extends React.Component {
  render() {
    return (
      <section className=''>
        <Route exact path='/private' component={Home} />
        <Route exact path='/private/profile' component={Profile} />
        <Route exact path='/private/people' component={People} />
        <Route exact path='/private/requests' component={Requests} />
        <Route path='/private/contact/' component={Person} />
        <Route path='/private/conversation/' component={Conversation} />
      </section>
    )
  }
}


const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(withUserData(Private));