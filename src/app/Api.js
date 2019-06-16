/** @format */

import axios from 'axios'
import store from '@/store/store'
import router from '@/router'
import * as types from './../store/mutation-types'
import * as mediaManagerStorage from './Storage'
import * as auth from './Auth'
import { service } from './Service'
import { user } from './User'
import { config } from './Config'

/**
 * Api class for communication with the server
 */
class Api {
  /**
   * Store constructor
   */
  constructor() {
    this.mediastorage = mediaManagerStorage
    this.auth = auth.services
    this.user = user
    this.config = config
    this.service = service
  }

  getUidV4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0
      var v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  // Debounce Api
  debounce(func, wait, immediate) {
    var timeout
    return function() {
      var context = this
      var args = arguments
      var later = function() {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }

  time_ago(previousDate) {
    var current = new Date()
    var msPerMinute = 60 * 1000
    var msPerHour = msPerMinute * 60
    var msPerDay = msPerHour * 24
    var msPerMonth = msPerDay * 30
    var msPerYear = msPerDay * 365

    var elapsed = current - previousDate

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago'
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago'
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago'
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' days ago'
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months ago'
    } else {
      return Math.round(elapsed / msPerYear) + ' years ago'
    }
  }

  /**
   * Set the axios settings.
   */
  axios() {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${this.mediastorage.cookies.get('token')}`
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    axios.defaults.headers.common['csrfToken'] = process.env.VUE_APP_SECRET

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(
      err
    ) {
      var config = err.config
      // If config does not exist or the retry option is not set, reject
      if (!config || !config.retry) return Promise.reject(err)

      // Set the variable for keeping track of the retry count
      config.__retryCount = config.__retryCount || 0

      // Check if we've maxed out the total number of retries
      if (config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err)
      }

      // Increase the retry count
      config.__retryCount += 1

      // Create new promise to handle exponential backoff
      var backoff = new Promise(function(resolve) {
        setTimeout(function() {
          resolve()
        }, config.retryDelay || 1)
      })

      // Return the promise in which recalls axios to retry the request
      return backoff.then(function() {
        return axios(config)
      })
    })

    return axios
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
    }

    switch (error.response.status) {
      case 409:
        store.commit(types.SHOW_SNACKBAR, errorData)
        break
      case 404:
        store.state.errorState = true
        errorData.data = 'Something went wrong.'
        store.commit(types.SHOW_SNACKBAR, errorData)
        break
      case 401:
        this.auth.logout()
        router.push('/')
        store.commit(types.SHOW_SNACKBAR, errorData)
        break
      case 403:
        store.commit(types.SHOW_SNACKBAR, errorData)
        break
      case 500:
        errorData.data = 'Server Internal Error.'
        store.commit(types.SHOW_SNACKBAR, errorData)
        break
      default:
        store.commit(types.SHOW_SNACKBAR, errorData)
    }

    throw error
  }
}

export let api = new Api()
