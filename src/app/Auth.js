// import Api from '@/services/Api'
import * as mediaManagerStorage from './Storage.js'

export const services = {

  /**
   * Get the contents of a directory from the server
   * @returns {Promise}
   */
  loggedIn() {
    if((mediaManagerStorage.session.get('email') !== '' && mediaManagerStorage.session.get('email') !== null)
      && (mediaManagerStorage.session.get('token') !== '' && mediaManagerStorage.session.get('token') !== null)) {
      return true;
    } else {
      return false;
    }
  },
}
