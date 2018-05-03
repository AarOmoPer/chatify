import React from 'react';
import PropTypes from 'prop-types';

import { firebase } from '../../firebase';
import {users} from '../../firebase/db'

const withUserData = (Component) => {
  class withUserData extends React.Component {
    state = {
      userDetails: null,
    };

    getChildContext() {
      return {
        userDetails: this.state.userDetails,
      };
    }
    
    getData(authUserUid){
      users.getUser(authUserUid, userDetails => this.setState({userDetails}))
    }

    resetData(){
      this.setState(() => ({ userDetails: null }))
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.getData(authUser.uid)
          : this.resetData();
      });
    }

    render() {
      return (
        <Component />
      );
    }
  }

  withUserData.childContextTypes = {
    userDetails: PropTypes.object,
  };
  withUserData.contextTypes = {
    authUser: PropTypes.object,
  };

  return withUserData;
}

export default withUserData;