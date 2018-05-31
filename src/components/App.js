import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import {withAuthUser} from './higherOrderComponents'

import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.min.css';
import './styles/main.css'

import SignIn from './pageComponents/SignIn'
import Public from './Public'
import Private from './Private'

class App extends React.Component{
  render(){
    return(
      <section>
        <BrowserRouter>
            <section className='hero'>
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