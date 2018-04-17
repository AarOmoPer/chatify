import {store} from './firebase';

export const storeUserImage = (uid, user_image) => store
  .ref(`user_images/${uid}`)
  .put(user_image);

export const getUserImage = () => {}