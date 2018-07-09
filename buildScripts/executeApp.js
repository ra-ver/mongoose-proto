import connectMongoose from '../src/data/setupDBConn';
import {
  bulkIndexModels,
  indexOneModelToES
} from '../src/data/dao/CancerModelDao';

setTimeout(() => {
  // connect to database
  connectMongoose();

  bulkIndexModels(30);

  setTimeout(() => {
    indexOneModelToES({
      name: "APTB-ohni"
    });
  }, 5000);

}, 1000);
