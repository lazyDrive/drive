import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './mongodb.datasource.json';

export class MongodbDataSource extends juggler.DataSource {
  static dataSourceName = 'mongodb';

  constructor(
    @inject('datasources.config.mongodb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
