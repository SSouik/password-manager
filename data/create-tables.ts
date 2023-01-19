import DynamoDBClient from './client';

const passwordTable = require('./tables/password.json');
const clientTable = require('./tables/client.json');

// Create password table
DynamoDBClient.createTable(passwordTable);
DynamoDBClient.createTable(clientTable);
