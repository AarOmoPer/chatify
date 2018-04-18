import React from 'react';
import PropTypes from 'prop-types';

import { firebase } from '../../firebase';

const withUserData = (Component) => {
  class withUserData extends React.Component {
    state = {
      userData: null,
    };

    getChildContext() {
      return {
        userData: this.state.userData,
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

  withUserData.childContextTypes = {
    userData: PropTypes.object,
  };

  return withUserData;
}

export default withUserData;