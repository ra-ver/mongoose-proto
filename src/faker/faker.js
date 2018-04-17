import SchemaFaker from './schema-faker';
import SchemaTransformer from './schema-transformer';
import schema from './schema';

const transformer = new SchemaTransformer();

transformer.transform(schema);

export const generateItems = count => {
  let output = [];
  // generate 5000 data points
  for (let counter = 0; counter < count; counter++) {
    let dataPoint = new SchemaFaker(schema);
    output.push(dataPoint);
  }
  return output;
};
