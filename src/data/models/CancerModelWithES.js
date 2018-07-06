import mongoose from 'mongoose';
import mongooseElasticsearch from 'mongoose-elasticsearch-xp';
import {
  CancerModelSchema
} from './schema';

CancerModelSchema.plugin(mongooseElasticsearch);

export const CancerModelES = mongoose.model('CancerModelES', CancerModelSchema);
