import React from 'react';
import {Link} from 'react-router-dom'

class PersonIcon extends React.Component {
  render() {
    const {username, image, conversationUid} = this.props
    return (
      <Link
        to={`private/conversation/${conversationUid}`}
        className='medium-margin-right has-text-centered'>
        <section className=''>
          <figure className="image is-128x128 medium-picture">
            <img
              className='round-up medium-picture default-user-image'
              alt=''
              src={image || ""}/>
          </figure>
          <h1 className=''>{username.split(' ')[0]}</h1>
        </section>
      </Link>
    )
  }
}

export default PersonIcon;