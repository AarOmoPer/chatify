import React from 'react';
import {addContact, removeContact} from '../firebase/db'

class PersonMin extends React.Component {
  render() {
    const {
      username,
      email,
      image,
      canAdd,
      canRemove,
    } = this.props
    return (
      <section className='title'>
        <div className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-96x96">
                  <img className='round-up personMinImg' src={image} alt=""/>
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-5">{username}</p>
                <p className="subtitle is-7">{email}</p>
                {(canAdd && !canRemove) && <button
                  className='button is-rounded is-danger is-pulled-right'
                  onClick={this.addContact}>Add</button>}
                {canRemove && <button
                  className='button is-rounded is-danger is-pulled-right'
                  onClick={this.removeContact}>Remove</button>}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  addContact = () => {
    const {authUserUid, userUid, updateContacts} = this.props;
    addContact(authUserUid, userUid);
    updateContacts()
  }

  removeContact = () => {
    const {authUserUid, userUid, updateContacts} = this.props;
    removeContact(authUserUid, userUid);
    updateContacts()
  }
}

export default PersonMin