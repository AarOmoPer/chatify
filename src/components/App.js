import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import {withAuthUser} from './higherOrderComponents'

import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.min.css';
import './styles/main.css'

import SignIn from './SignIn'
import Public from './Public'
import Private from './Private'
import Profile from './Profile'
import People from './People'


class App extends React.Component{
  render(){
    return(
      <section>
        <BrowserRouter>
            <section className='hero is-fullheight'>
              <Route exact path='/' component={SignIn} />
              <Route exact path='/public' component={Public} />
              <Route exact path='/private' component={Private} />
              <Route exact path='/private/profile' component={Profile} />
              <Route exact path='/private/people' component={People} />
            </section>
        </BrowserRouter>
      </section>
    )
  }
}

export default withAuthUser(App);