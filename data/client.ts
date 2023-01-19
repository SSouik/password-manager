import { DynamoDBClient } from '../libs/dynamodb-client/src';

const client = new DynamoDBClient({
    tablePrefix: 'local.',
    region: 'us-east-2',
    endpoint: 'http://localhost:7777',
});

export default client;
