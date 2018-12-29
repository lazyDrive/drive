// import Api from '@/services/Api'
import * as mediaManagerStorage from './Storage.js'

export const services = {

  /**
   * Get the contents of a directory from the server
   * @returns {Promise}
   */
  loggedIn() {
    if(mediaManagerStorage.cookies.get('email') !== '' && mediaManagerStorage.cookies.get('token') !== '')
    return true;
    else
    return false;
  },
}
