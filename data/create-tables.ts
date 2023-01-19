/* eslint-disable @typescript-eslint/no-var-requires */

import DynamoDBClient from './client';

const clientTable = require('./tables/client.json');
const passwordTable = require('./tables/password.json');

// Create password table
DynamoDBClient.createTable(passwordTable);
DynamoDBClient.createTable(clientTable);
