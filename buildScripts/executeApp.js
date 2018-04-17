import connectMongoose from '../src/data/setupDBConn';
import { writeModelsWithDelay } from '../src/data/dao/CancerModelDao';

// connect to database
connectMongoose();

writeModelsWithDelay(30);
