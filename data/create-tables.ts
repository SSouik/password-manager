/* eslint-disable @typescript-eslint/no-var-requires */

import DynamoDBClient from './client';

const clientTable = require('./tables/client.json');
const passwordTable = require('./tables/password.json');
const securityQuestionTable = require('./tables/security-question.json');

// Create password table
DynamoDBClient.createTable(clientTable);
DynamoDBClient.createTable(passwordTable);
DynamoDBClient.createTable(securityQuestionTable);
