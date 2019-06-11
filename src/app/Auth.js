// import Api from '@/services/Api'
import * as mediaManagerStorage from './Storage.js'

export const services = {

  /**
   * Get the contents of a directory from the server
   * @returns {Promise}
   */
  loggedIn() {
    if ((mediaManagerStorage.cookies.get('email') !== '' && mediaManagerStorage.cookies.get('email') !== null) &&
      (mediaManagerStorage.cookies.get('token') !== '' && mediaManagerStorage.cookies.get('token') !== null)) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * Get the contents of a directory from the server
   * @returns {Promise}
   */
  logout() {
    mediaManagerStorage.cookies.destroy('email');
    mediaManagerStorage.cookies.destroy('token');
    return true;
  },
}
