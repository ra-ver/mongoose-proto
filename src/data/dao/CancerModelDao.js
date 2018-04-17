import { CancerModel } from '../models/CancerModel';
import { generateItems } from '../../faker/faker';
import { CancerModelES } from '../models/CancerModelWithES';
/* eslint-disable */

// write a test object
export const testWriteToMongo = () => {
  generateItems(1).forEach(item => {
    const testObj = new CancerModel(item);
    testObj.save(
      err =>
        err
          ? console.log(err)
          : console.log(`Wrote one model to database with name: ${item.name}`)
    );
  });
};

export const testWriteToMongoAndES = () => {
  generateItems(1).forEach(item => {
    const testObj = new CancerModelES(item);
    testObj.save(
      err =>
        err
          ? console.log(err)
          : console.log(`Wrote one model to database with name: ${item.name}`)
    );
  });
};

export const writeModels = targetCount => {
  generateItems(targetCount).forEach((item, idx) => {
    const testObj = new CancerModelES(item);
    testObj.save(
      err =>
        err
          ? console.log(err)
          : console.log(`Wrote model # ${idx + 1} with name: ${item.name}`)
    );
  });
};

export const writeModelsWithDelay = targetCount => {
  generateItems(targetCount).forEach((item, idx) => {
    setTimeout(() => {
      const testObj = new CancerModelES(item);
      testObj.save(err => {
        err
          ? console.error(err)
          : console.log(`Wrote model # ${idx + 1} with name: ${item.name}`);
        testObj.on('es-indexed', (eserr, res) => {
          eserr
            ? console.error(`Writing to ES failed: ${eserr}`)
            : console.log(`Document indexed into ES, name: ${item.name}`);
          /* Document is indexed */
        });
      });
    }, 2000 * idx);
  });
};
