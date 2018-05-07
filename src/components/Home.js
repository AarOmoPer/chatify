import React from 'react';

import {HomeNav} from './navButtons'

import Contacts from './Contacts'
import Feed from './Feed'
import Notification from './Notification'

class Home extends React.Component{
  state = {
    view: false
  }
  render(){
    const {view} = this.state;
    return (
      <section className=''>
        <HomeNav />
        <section className='hero-body'>
          <section className='container'>
            <Contacts/>
            <button className='button is-danger' onClick={this.toggleView}>Toggle</button>
            {view
              ? <Feed/>
              : <Notification/>}
          </section>
        </section>
      </section>
    )
  }
  toggleView = () => this.setState({
    view: !this.state.view
  })
}

export default Home