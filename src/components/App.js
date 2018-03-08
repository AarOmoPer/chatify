import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import withAuthUser from './higher_order_components/withAuthUser'

import Landing_Page from './Landing_Page'
import Public_Page from './Public_Page'
import Private_Page from './Private_Page'


class App extends React.Component{
  render(){
    return(
      <section className=''>
        <BrowserRouter>
            <section className=''>
              <Route exact path='/' component={Landing_Page} />
              <Route exact path='/public' component={Public_Page} />
              <Route exact path='/private' component={Private_Page} />
            </section>
        </BrowserRouter>
      </section>
    )
  }
}

export default withAuthUser(App);