import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import {withAuthUser} from './higherOrderComponents'

import SignIn from './SignIn'
import Public from './Public'
import Private from './Private'


class App extends React.Component{
  render(){
    return(
      <section>
        <BrowserRouter>
            <section>
              <Route exact path='/' component={SignIn} />
              <Route exact path='/public' component={Public} />
              <Route path='/private' component={Private} />
            </section>
        </BrowserRouter>
      </section>
    )
  }
}

export default withAuthUser(App);