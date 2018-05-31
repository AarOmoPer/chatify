import React from 'react';
import PropTypes from 'prop-types'
import PersonMin from '../subComponents/PersonMin';

import {BackButton} from '../navBar'

class Requests extends React.Component {
  state = {
    view: true
  }
  render() {
    const {view} = this.state
    const {userContactRequests} = this.context
    console.log(userContactRequests)
    return (
      <section>
        <BackButton destination={'/private'}/>
        <section className='hero-body'>
          <section className='container'>
            <h1 className='title is-4'>Contact requests</h1>
            <section className='title'>
              <span className='is-size-5 has-text-weight-normal'>Pending</span>&nbsp;
              {view
                ? <i class="fa fa-toggle-on has-text-danger is-size-4" onClick={this.toggleView}></i>
                : <i class="fa fa-toggle-off has-text-danger is-size-4" onClick={this.toggleView}></i>}&nbsp;
                <span className='is-size-5 has-text-weight-normal'>Received</span>
            </section>

            {(view && userContactRequests && userContactRequests.received) && <section>
              <h1 className='subtitle'>Received requests: {userContactRequests.received.length}</h1>
              <section>
                {userContactRequests
                  .received
                  .map(request => <PersonMin
                    userUid={request.sender}
                    userData={{
                    ...request
                  }}/>)}
              </section>
            </section>}

            {(!view && userContactRequests && userContactRequests.pending) && <section>
              <h1 className='subtitle'>Pending requests: {userContactRequests.pending.length}</h1>
              <section>
              {userContactRequests
                .pending
                .map(request => <PersonMin
                  userUid={request.target}
                  userData={{
                  ...request
                }}/>)}
              </section>
            </section>}
          </section>
        </section>
      </section>
    )
  }

  toggleView = () => {
    this.setState({
      view: !this.state.view
    })
  }
}

Requests.contextTypes = {
  userContactRequests: PropTypes.object
}

export default Requests;