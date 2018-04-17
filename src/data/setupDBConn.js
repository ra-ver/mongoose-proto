import config from '../config';
import mongoose from 'mongoose';

const connectMongoose = () => {
  mongoose.Promise = global.Promise;

  const { mongoUser, mongoPass } = config;
  const mongoUri = `mongodb://${
    mongoUser && mongoPass
      ? `${encodeURIComponent(mongoUser)}:${encodeURIComponent(mongoPass)}@`
      : ''
  }${config.mongoHost}/${config.mongoDb}`;
  /*eslint-disable no-console */
  mongoose.connect(mongoUri, error => {
    if (error) {
      console.error('Error Connecting to mongo', error);
      return;
    }
    console.log(
      `Connected to mongo at mongodb://${config.mongoHost}/${config.mongoDb}`
    );
  });
};

export default connectMongoose;
