import axios from 'axios'
// import store from '@/store/store'
import * as mediaManagerStorage from './Storage.js'
/**
 * Api class for communication with the server
 */
class Api {

  /**
   * Store constructor
   */
  constructor() {
    this.mediastorage = mediaManagerStorage;
  }

  /**
   * Get the contents of a directory from the server
   * @returns {Promise}
   */
  axios() {
    return axios.create({
      headers: {
        Authorization: `Bearer ${this.mediastorage.cookies.get('token')}`,
        csrfToken: process.env.VUE_APP_SECRET
      }
    });
  }

  /**
   * Get the contents of a directory from the server
   * @returns {Promise}
   */
  isLoggedIn() {
    if(this.mediastorage.cookies.get('email') !== '' && this.mediastorage.cookies.get('token') !== '')
    return true;
    else
    return false;
  }
}


export let api = new Api();
