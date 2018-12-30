import axios from 'axios'
import store from '@/store/store'
import * as types from "./../store/mutation-types";
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
   *
   */
  _handleError(error) {

    var data = {
      data: error.response.data.message,
      color: 'error'
    };

    store.commit(types.SHOW_SNACKBAR, data);

    switch (error.response.status) {
      case 409:
      console.log(error)
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
