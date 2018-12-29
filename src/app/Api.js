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
}


export let api = new Api();
