/**
 * User .
 */
class Config {

  /**
   * User constructor
   */
  constructor() {
    this.proxyPort = process.env.PORT ? process.env.PORT : 3344;
    this.redirectPort = process.env.NODE_ENV === 'production' ? process.env.PORT ? process.env.PORT : 3344 : 8080;
  }
}

export let config = new Config();
