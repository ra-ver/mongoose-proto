/*
 Create a schema for model
 Create a model object
 Write data to Mongo
 Write data to ES

 repeat that step by generating a fake data
 break ES connection and see behavior
*/
import mongoose from 'mongoose';
import {
  CancerModelSchema
} from './schema';
export const CancerModel = mongoose.model('CancerModel', CancerModelSchema);
