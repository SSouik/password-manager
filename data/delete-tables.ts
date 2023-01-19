import DynamoDBClient from './client';

DynamoDBClient.deleteTable('Password');
DynamoDBClient.deleteTable('Client');
