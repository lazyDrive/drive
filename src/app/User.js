/** @format */

import * as jwt_decode from 'jwt-decode'
import * as mediaManagerStorage from './Storage'

/**
 * User .
 */
class User {
  /**
   * User constructor
   */
  constructor() {
    this.token = mediaManagerStorage.cookies.get('token')
    this.userData = this.getTokenData()
  }

  getTokenData() {
    try {
      return jwt_decode(this.token)
    } catch (Error) {
      return null
    }
  }
}

export let user = new User()
