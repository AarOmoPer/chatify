import React from 'react';
import PropTypes from 'prop-types';
import {getUser, updateUsername, updateUserImage} from '../firebase/db'
import {storeUserImage} from '../firebase/store'

import BackButton from './BackButton';

class Profile extends React.Component {
  state = {
    userData: this.props.userData,
    newUsername: '',
    usernameMessage: {
      text: '',
      colour: ''
    },
    uploadProgress: 0
  }

  render() {
    const {userData, newUsername, usernameMessage, uploadProgress} = this.state
    return (
      <section className=''>
        <BackButton destination='/private'/>

        <section className='hero-body'>
          <section className='container'>
            <section className='title flex-container'>
              <figure className="image is-256x256 large-picture">
                <img
                  className='round-up large-picture default-user-image'
                  alt=''
                  src={userData && userData.image
                  ? userData.image
                  : ""}/>
              </figure>
            </section>
            
            <section className='medium-space'>
              {uploadProgress > 0 && <progress className="progress is-danger" value={uploadProgress} max="100"/>}
            </section>

            <section className="file is-pulled-right">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  onChange={this.updateUserImage}
                  name="resume"/>
                <span className="file-cta round-up">
                  <span className="file-icon">
                    <i className="fa fa-upload"></i>
                  </span>
                  <span className="file-label">
                    Change profile photo 
                  </span>
                </span>
              </label>
            </section>
            
            <br />
            <br />

            <section className="field">
              <label className="label">Username</label>
              <section className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="text"
                  placeholder={userData && userData.username}
                  value={newUsername}
                  onChange={this.appendToUsername}/>
                <span className="icon is-small is-left">
                  <i className="fa fa-user"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fa fa-check"></i>
                </span>
              </section>
              <p className={`help is-${usernameMessage.colour}`}>{usernameMessage.text}</p>
            </section>

            <section className="field">
              <label className="label">Email</label>
              <section className="control has-icons-left has-icons-right">
                <input className="input" type="email" placeholder="" value={userData ? userData.email : ''}/>
                <span className="icon is-small is-left">
                  <i className="fa fa-envelope"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fa fa-exclamation-triangle"></i>
                </span>
              </section>
              {/* <p className="help is-danger">You cannot change your email.</p> */}
            </section>

            <section className="control">
              {newUsername
                ? <button className="button is-danger is-rounded is-pulled-right" onClick={this.updateUsername}>Save changes</button>
                : <button className="button is-danger is-rounded is-pulled-right" disabled>Save changes</button>}
            </section>
            {/* <button className='button is-text'>Deactivate your account</button> */}
          </section>
        </section>
      </section>
    )
  }

  appendToUsername = event => this.setState({newUsername: event.target.value})

  updateUsername = () => updateUsername(this.context.authUser.uid, this.state.newUsername).then(() => {
    this.setState({newUsername: ''});
    getUser(this.context.authUser.uid).then(userData => this.setState({userData}))
  })

  updateUserImage = e => {
    const uploadTask = storeUserImage(this.context.authUser.uid, e.target.files[0])
    uploadTask.on('state_changed', snapshot => {
      this.setState({
        uploadProgress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      });
    }, error => {}, () => {
      updateUserImage(this.context.authUser.uid, uploadTask.snapshot.downloadURL).then(() => getUser(this.context.authUser.uid).then(userData => this.setState({userData, uploadProgress: 0})))
    });

  }
}

Profile.contextTypes = {
  authUser: PropTypes.object
}

export default Profile;