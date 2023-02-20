import DynamoDBClient from './client';

DynamoDBClient.deleteTable('Client');
DynamoDBClient.deleteTable('Password');
DynamoDBClient.deleteTable('SecurityQuestion');
