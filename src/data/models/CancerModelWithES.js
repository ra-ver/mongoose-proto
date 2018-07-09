import mongoose from 'mongoose';
import mongooseElasticsearch from 'mongoose-elasticsearch-xp';
import {
  CancerModelSchema
} from './schema';
import elasticClient from "../../es/client"

const index = process.env.ES_INDEX || "meeting-demo-models";
const type = process.env.ES_TYPE || "models";
CancerModelSchema.plugin(mongooseElasticsearch, {
  client: elasticClient,
  index,
  type
});

export const CancerModelES = mongoose.model('CancerModelES', CancerModelSchema);
