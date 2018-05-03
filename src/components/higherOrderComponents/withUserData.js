import React from 'react';
import PropTypes from 'prop-types';

import {firebase} from '../../firebase';
import {users, contacts} from '../../firebase/db'

const withUserData = (Component) => {
  class withUserData extends React.Component {
    state = {
      userDetails: null,
      userContacts: null
    };

    getChildContext() {
      return {userDetails: this.state.userDetails, userContacts: this.state.userContacts};
    }

    getData(authUserUid) {
      users.getUser(authUserUid, userDetails => this.setState({userDetails}))
      contacts.getContacts(authUserUid, userContacts => this.setState({userContacts}))
    }

    resetData() {
      this.setState(() => ({userDetails: null, userContacts: null}))
    }

    componentDidMount() {
      firebase
        .auth
        .onAuthStateChanged(authUser => {
          authUser
            ? this.getData(authUser.uid)
            : this.resetData();
        });
    }

    render() {
      return (<Component/>);
    }
  }

  withUserData.childContextTypes = {
    userDetails: PropTypes.object,
    userContacts: PropTypes.object
  };
  withUserData.contextTypes = {
    authUser: PropTypes.object
  };

  return withUserData;
}

export default withUserData;