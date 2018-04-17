import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {getUser, updateUsername, updateUserImage} from '../firebase/db'
import {getUserImage, storeUserImage} from '../firebase/store'
import {withAuthorization} from './higherOrderComponents';

import BackButton from './BackButton';

class Profile extends React.Component {
  state = {
    user: null,
    newUsername: '',
    usernameMessage: {
      text: '',
      colour: ''
    },
    uploadProgress: 0
  }

  componentDidMount() {
    getUser(this.context.authUser.uid).then(user => this.setState({user}))
  }

  render() {
    const {user, newUsername, usernameMessage, uploadProgress} = this.state
    return (
      <section className=''>
        <BackButton destination='/private'/>

        <section className='hero-body'>
          <section className='container'>
            <section className='title flex-container'>
              <figure className="image is-256x256 large-picture">
                <img
                  className='round-up'
                  src={user && user.image
                  ? user.image
                  : ""}/>
              </figure>
            </section>

            {/* <input type='file' onChange={this.updateUserImage}/> */}

            {uploadProgress > 0 && <progress class="progress is-danger" value={uploadProgress} max="100"/>}

            <div class="file is-pulled-right">
              <label class="file-label">
                <input
                  class="file-input"
                  type="file"
                  onChange={this.updateUserImage}
                  name="resume"/>
                <span class="file-cta round-up is-danger">
                  <span class="file-icon">
                    <i class="fa fa-upload"></i>
                  </span>
                  <span class="file-label">
                    New
                  </span>
                </span>
              </label>
            </div>
            
            <br />
            <br />

            <div class="field">
              <label class="label">Username</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="text"
                  placeholder={user && user.username}
                  value={newUsername}
                  onChange={this.appendToUsername}/>
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fa fa-check"></i>
                </span>
              </div>
              <p class={`help is-${usernameMessage.colour}`}>{usernameMessage.text}</p>
            </div>

            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-left has-icons-right">
                <input class="input" type="email" placeholder="" value={user && user.email}/>
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fa fa-exclamation-triangle"></i>
                </span>
              </div>
              {/* <p class="help is-danger">You cannot change your email.</p> */}
            </div>

            <div class="control">
              {newUsername
                ? <button class="button is-danger is-pulled-right" onClick={this.updateUsername}>Save changes</button>
                : <button class="button is-danger is-pulled-right" disabled>Save changes</button>}
            </div>
          </section>
        </section>
      </section>
    )
  }

  appendToUsername = event => this.setState({newUsername: event.target.value})

  updateUsername = () => updateUsername(this.context.authUser.uid, this.state.newUsername).then(() => {
    this.setState({newUsername: ''});
    getUser(this.context.authUser.uid).then(user => this.setState({user}))
  })

  updateUserImage = e => {
    const uploadTask = storeUserImage(this.context.authUser.uid, e.target.files[0])
    uploadTask.on('state_changed', snapshot => {
      this.setState({
        uploadProgress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      });
    }, error => {}, () => {
      updateUserImage(this.context.authUser.uid, uploadTask.snapshot.downloadURL).then(() => getUser(this.context.authUser.uid).then(user => this.setState({user, uploadProgress: 0})))
    });

  }
}

Profile.contextTypes = {
  authUser: PropTypes.object
}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Profile);