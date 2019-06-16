/** @format */

import store from '@/store/store'
import DropboxApi from './apps/Dropbox'
import GoogleApi from './apps/Google'
import { config } from './Config'

/**
 * services
 */
class Services {
  /**
   * Store constructor
   */
  constructor() {
    const dropboxAccessToken = store.state.settings.dropbox.accessToken
    this.dropbox = new DropboxApi(dropboxAccessToken, config.redirectPort)
    this.google = GoogleApi
  }
}

export let service = new Services()
