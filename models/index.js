// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Report, Salesteam, Campaign, Client } = initSchema(schema);

export {
  Report,
  Salesteam,
  Campaign,
  Client
};