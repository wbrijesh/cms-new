// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { SalesTeam, Campaign, Client } = initSchema(schema);

export {
  SalesTeam,
  Campaign,
  Client
};