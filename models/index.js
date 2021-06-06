// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Campaign, Client } = initSchema(schema);

export {
  Campaign,
  Client
};