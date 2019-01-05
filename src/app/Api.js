import axios from 'axios'
import store from '@/store/store'
import router from '@/router';
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

    var errorData = {
      data: error.response.data.message,
      color: 'error'
    };

    switch (error.response.status) {
      case 409:
      store.commit(types.SHOW_SNACKBAR, errorData);
        break;
      case 404:
      errorData.data = 'Something went wrong.';
      store.commit(types.SHOW_SNACKBAR, errorData);
        break;
      case 401:
      this.auth.logout();
      router.push('/login');
      store.commit(types.SHOW_SNACKBAR, errorData);
        break;
      case 403:
      store.commit(types.SHOW_SNACKBAR, errorData);
        break;
      case 500:
      errorData.data = 'Server Internal Error.';
      store.commit(types.SHOW_SNACKBAR, errorData);
        break;
      default:
      store.commit(types.SHOW_SNACKBAR, errorData);
    }

    throw error;
  }
}


export let api = new Api();
