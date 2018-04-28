import React from 'react';

class PersonIcon extends React.Component {
  render() {
    const {username, email, image} = this.props
    return (
      <section className='medium-margin-right has-text-centered'>
        <section className=''>
          <figure className="image is-128x128 medium-picture">
            <img
              className='round-up medium-picture default-user-image'
              alt=''
              src={image || ""}/>
          </figure>
        <h1 className=''>{username.split(' ')[0]}</h1>
        </section>
      </section>
    )
  }
}

export default PersonIcon;