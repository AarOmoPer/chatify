import React from 'react';
import {Link} from 'react-router-dom'

class PersonIcon extends React.Component {
  render() {
    const {username, email, image, conversationUid} = this.props
    return (
      <Link
        to={`private/conversation/${conversationUid}`}
        className='box has-text-centered'>
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img className='round-up default-user-image' src={image || ""}/>
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p className=''>
                  <h1 className='title is-4'>{username.split(' ')[0]}</h1>
                  <h1 className='subtitle has-text-weight-light is-6 is-clipped'>{email}</h1>
                </p>
              </div>
            </div>
            {/* <div class="media-right">
              <i class="is-size-4 has-text-danger fa fa-user-circle"></i>
            </div> */}
          </article>
      </Link>
    )
  }
}

export default PersonIcon;