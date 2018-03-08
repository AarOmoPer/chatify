import React from 'react';
import PropTypes from 'prop-types';

import { firebase } from '../../firebase';

const withAuthUser = (Component) => {
  class withAuthUser extends React.Component {
    state = {
      authUser: null,
    };

    getChildContext() {
      return {
        authUser: this.state.authUser,
      };
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));
      });
    }

    render() {
      return (
        <Component />
      );
    }
  }

  withAuthUser.childContextTypes = {
    authUser: PropTypes.object,
  };

  return withAuthUser;
}

export default withAuthUser;