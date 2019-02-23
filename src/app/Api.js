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

  getUidV4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  time_ago(time) {

    switch (typeof time) {
      case 'number':
        break;
      case 'string':
        time = +new Date(time);
        break;
      case 'object':
        if (time.constructor === Date) time = time.getTime();
        break;
      default:
        time = +new Date();
    }
    var time_formats = [
      [60, 'seconds', 1], // 60
      [120, '1 minute ago', '1 minute from now'], // 60*2
      [3600, 'minutes', 60], // 60*60, 60
      [7200, '1 hour ago', '1 hour from now'], // 60*60*2
      [86400, 'hours', 3600], // 60*60*24, 60*60
      [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
      [604800, 'days', 86400], // 60*60*24*7, 60*60*24
      [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
      [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
      [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
      [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
      [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
      token = 'ago',
      list_choice = 1;

    if (seconds == 0) {
      return 'Just now'
    }
    if (seconds < 0) {
      seconds = Math.abs(seconds);
      token = 'from now';
      list_choice = 2;
    }
    var i = 0,
      format;
    while (format == time_formats[i++])
      if (seconds < format[0]) {
        if (typeof format[2] == 'string')
          return format[list_choice];
        else
          return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
      }
    return time;
  }

  /**
   * Get the contents of a directory from the server
   * @returns {Promise}
   */
  axios() {

    let axiosInstance;

    axios.defaults.headers.common['Authorization'] = `Bearer ${this.mediastorage.cookies.get('token')}`;
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    axios.defaults.headers.common['csrfToken'] = process.env.VUE_APP_SECRET;

    if (process.env.NODE_ENV == 'production') {
      axiosInstance = axios.create({
        baseURL: process.env.PORT ? process.env.PORT : 'http://localhost:3344',
      });
    } else {
      axiosInstance = axios.create();
    }

    axiosInstance.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
      var config = err.config;
      // If config does not exist or the retry option is not set, reject
      if (!config || !config.retry) return Promise.reject(err);

      // Set the variable for keeping track of the retry count
      config.__retryCount = config.__retryCount || 0;

      // Check if we've maxed out the total number of retries
      if (config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
      }

      // Increase the retry count
      config.__retryCount += 1;

      // Create new promise to handle exponential backoff
      var backoff = new Promise(function (resolve) {
        setTimeout(function () {
          resolve();
        }, config.retryDelay || 1);
      });

      // Return the promise in which recalls axios to retry the request
      return backoff.then(function () {
        return axiosInstance(config);
      });
    });

    return axiosInstance;
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
