import {LazydriveApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {LazydriveApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new LazydriveApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
