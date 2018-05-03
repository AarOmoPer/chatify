import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

class PersonMin extends React.Component {
  render() {
    const {userUid, userData} = this.props
    const {username, email, image} = userData
    const {authUser} = this.context
    return (
      <Link to={`/private/contact/${userUid}`} className='title'>
        <div className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-96x96">
                  <img className='round-up small-picture default-user-image' src={image} alt=""/>
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-5">{username}</p>
                <p className="subtitle is-7">{email}</p>

                {/* {(isStranger && isNotMe) && <button
                  className='button is-rounded is-danger is-pulled-right'
                  onClick={() => null}>Add</button>}

                {isRequest && <section className='field is-grouped is-pulled-right'>
                  <p className='control'>
                    <button
                      className='button is-rounded is-danger'
                      onClick={() => null}>Accept</button>
                  </p>
                  <p className='control'>
                    <button
                      className='button is-rounded is-danger'
                      onClick={() => null}>Decline</button>
                  </p>
                </section>} */}
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

}
export default PersonMin