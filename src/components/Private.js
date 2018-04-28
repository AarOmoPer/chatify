import React from 'react';
import PropTypes from 'prop-types'
import {getAuthUserData} from '../firebase/db'
import {withAuthorization} from './higherOrderComponents'
import {Route} from 'react-router-dom'

import Home from './Home'
import Profile from './Profile'
import People from './People'
import Person from './Person'

class Private extends React.Component {
  state = {
    userData: null,
  }

  componentDidMount() {
    const {authUser} = this.context
    getAuthUserData(authUser.uid).on('value', res => {
      const userData = res.val();
      this.setState({userData})
    })
  }
  
  render() {
    const {userData} = this.state;
    return (
      <section className=''>
        <Route exact path='/private' render={() => userData && <Home userData={userData} />}/>
        <Route exact path='/private/profile' render={() => userData && <Profile userData={userData} />}/>
        <Route path='/private/contact/' render={() => <Person userData={userData} />}/>
        <Route exact path='/private/people' component={People} />
      </section>
    )
  }
}

Private.contextTypes = {
  authUser: PropTypes.object
}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Private);