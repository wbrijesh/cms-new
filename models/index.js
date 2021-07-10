// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Rmodel, Salesteam, Campaign, Client } = initSchema(schema);

export {
  Rmodel,
  Salesteam,
  Campaign,
  Client
};