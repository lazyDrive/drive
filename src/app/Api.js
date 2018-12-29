import axios from 'axios'
// import store from '@/store/store'
import * as mediaManagerStorage from './Storage.js'
import * as auth from './Auth.js'
/**
 * Api class for communication with the server
 */
class Api {

  /**
   * Store constructor
   */
  constructor() {
    this.mediastorage = mediaManagerStorage;
    this.auth = auth.services;
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
   * Handle errors
   * @param error
   * @private
   *
   * @TODO DN improve error handling
   */
  _handleError(error) {
    switch (error.status) {
      case 409:
        // Handled in consumer
        break;
      case 404:
        console.log(error)
        break;
      case 401:
      console.log(error)
        break;
      case 403:
      console.log(error)
        break;
      case 500:
      console.log(error)
        break;
      default:
      console.log(error)
    }

    throw error;
  }
}


export let api = new Api();
