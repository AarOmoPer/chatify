import * as firebase from 'firebase'
import {config} from './config'


if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const store = firebase.storage();
const auth = firebase.auth();

export {
  db,
  auth,
  store
};