import { DynamoDBClient, DynamoDBConnection } from '../libs/password-manager-dynamodb-client/src';

const client = new DynamoDBClient(<DynamoDBConnection>{
    tablePrefix: 'local.',
    region: 'us-east-2',
    endpoint: 'http://localhost:7777',
    credentials: {
        accessKeyId: 'foo',
        secretAccessKey: 'bar',
    },
});

export default client;
