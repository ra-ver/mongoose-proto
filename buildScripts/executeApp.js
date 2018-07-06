import connectMongoose from '../src/data/setupDBConn';
import {
  bulkIndexModels
} from '../src/data/dao/CancerModelDao';

setTimeout(() => {
  // connect to database
  connectMongoose();

  bulkIndexModels(30);
}, 10000);
