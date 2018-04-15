import React from 'react';

class Contacts extends React.Component{
  state = {
    contacts: [{name: 'Jason'}, {name: 'Sally'}]
  }

  render(){
    const {contacts} = this.state 
    return(
      <section className=''>
        <input /> <button>Search</button>
        <ul>
          {contacts.map(contact => <li>{contact.name}</li>)}
        </ul>
      </section>
    )
  }
}

export default Contacts;