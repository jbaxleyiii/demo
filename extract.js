const { readFileSync, writeFileSync, unlinkSync, existsSync } = require('fs');
const recurse = require('klaw-sync');
const { join, extname } = require('path');
const { buildSchema, printSchema } = require('graphql')

const schema = printSchema(buildSchema(recurse(join(__dirname, './src/schema'))
  .filter(x => extname(x.path) === '.graphqls')
  .map(({ path }) => readFileSync(path, { encoding: 'utf8' }))
  .join('\n')));


const SCHEMA_PATH = 'schema.graphql';

if (existsSync(SCHEMA_PATH)) {
  console.log("removing previous schema");
  unlinkSync(SCHEMA_PATH)
}
writeFileSync(SCHEMA_PATH, schema, { encoding: 'utf8' });
console.log('file written')
