import React from 'react';

import {HomeNav} from '../navBar'

import Contacts from './Contacts'

class Home extends React.Component{
  render(){
    return (
      <section className=''>
        <HomeNav />
        <section className='hero-body'>
          <section className='container'>
            <Contacts/>
          </section>
        </section>
      </section>
    )
  }
}

export default Home