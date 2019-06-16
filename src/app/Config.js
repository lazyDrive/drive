/**
 * User .
 *
 * @format
 */

class Config {
  /**
   * User constructor
   */
  constructor() {
    this.BASE_URL = 'http://172.16.187.238'
    this.proxyPort = process.env.PORT ? process.env.PORT : 3344
    this.redirectPort =
      process.env.NODE_ENV === 'production'
        ? process.env.PORT
          ? process.env.PORT
          : 3344
        : 8080
    this.settings = {
      dropbox: {},
      google: {}
    }
  }
}

export let config = new Config()
