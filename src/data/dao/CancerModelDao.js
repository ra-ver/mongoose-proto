import {
  CancerModel
} from '../models/CancerModel';
import {
  generateItems
} from '../../faker/faker';
import {
  CancerModelES
} from '../models/CancerModelWithES';
/* eslint-disable */

// write a test object
export const testWriteToMongo = () => {
  generateItems(1).forEach(item => {
    const testObj = new CancerModel(item);
    testObj.save(
      err =>
      err ?
      console.log(err) :
      console.log(`Wrote one model to database with name: ${item.name}`)
    );
  });
};

export const testWriteToMongoAndES = () => {
  generateItems(1).forEach(item => {
    const testObj = new CancerModelES(item);
    testObj.save(
      err =>
      err ?
      console.log(err) :
      console.log(`Wrote one model to database with name: ${item.name}`)
    );
  });
};

export const writeModels = targetCount => {
  generateItems(targetCount).forEach((item, idx) => {
    const testObj = new CancerModelES(item);
    testObj.save(
      err =>
      err ?
      console.log(err) :
      console.log(`Wrote model # ${idx + 1} with name: ${item.name}`)
    );
  });
};

export const writeModelsWithDelay = targetCount => {
  generateItems(targetCount).forEach((item, idx) => {
    setTimeout(() => {
      const testObj = new CancerModelES(item);
      testObj.save(err => {
        err
          ?
          console.error(err) :
          console.log(`Wrote model # ${idx + 1} with name: ${item.name}`);
        testObj.on('es-indexed', (eserr, res) => {
          eserr
            ?
            console.error(`Writing to ES failed: ${eserr}`) :
            console.log(`Document indexed into ES, name: ${item.name}`);
          /* Document is indexed */
        });
      });
    }, 2000 * idx);
  });
};

const indexModelsToES = targetCount => {
  console.log(`Going to index ${targetCount} documents`);
  let currentDate = new Date();
  let dateSearch = currentDate.toISOString().replace(/[\T].*[\Z]/g, "T00:00:00.000Z");
  var inputDate = new Date(dateSearch);
  let count = 1;
  CancerModelES.on('es-bulk-sent', function () {
    //console.log('Bulk index request sent to Elasticsearch.');
  });

  CancerModelES.on('es-bulk-data', function (doc) {
    console.log(`Indexing document # ${count++} with name: ${doc.name}`);
  });

  CancerModelES.on('es-bulk-error', function (err) {
    console.error(err);
  });

  CancerModelES
    .esSynchronize({
      "name": {
        $gte: inputDate
      }
    })
    .then((result) => {
      console.log(result);
      console.log('Indexing Complete.');
    });
};

export const indexOneModelToES = filter => {
  CancerModelES.findOne(filter, (err, doc) => {
    doc.esIndex((err, res) => {
      err ?
        console.log(`Indexing failed with error: ${err}`) :
        console.log(`Indexing successful with status: ${res.result}`);
    });
  });
};

export const bulkIndexModels = targetCount => {
  let count = 0;
  generateItems(targetCount).forEach((item, idx) => {
    const testObj = new CancerModel(item);
    testObj.save(err => {
      err
        ?
        console.error(err) :
        count++, console.log(`Wrote model # ${idx + 1} with name: ${item.name}`);
      // es-indexed is not supposed to run as this model doesn't have the plugin attached
      // this is kept here just to make sure to catch an unexpected behavior in the event plugin gets attached to the model at some other place in the code
      testObj.on('es-indexed', (eserr, res) => {
        eserr
          ?
          console.error(`Writing to ES failed: ${eserr}`) :
          console.log(`Document indexed into ES, name: ${item.name}`);
        /* Document is indexed */
      });
    });
  });
  // trigger es indexing if all docs are saved
  setTimeout(() => {
    count == targetCount ?
      indexModelsToES(count) :
      console.log("Waiting for MongoDB to populate.")
  }, 1000);
};

// test filtered indexing

// test one model indexing

// test one model update

// test es_value

// test existing document update

// test indexing when es is turned off - does it re-index automatically when es comes back up
