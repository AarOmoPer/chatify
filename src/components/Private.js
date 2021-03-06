import React from 'react';
import {withAuthorization, withUserData} from './higherOrderComponents'
import {Route} from 'react-router-dom'

import Home from './Home'
import Profile from './Profile'
import People from './People'
import Person from './Person'
import Requests from './Requests'
import Conversation from './Conversation'

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