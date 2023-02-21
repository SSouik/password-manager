import { DynamoDBClient as AWSDynamoDBClient } from '@aws-sdk/client-dynamodb';

import { DynamoDBClient } from './DynamoDBClient';
import { IDynamoDBClient } from './types';

describe('DynamoDBClient Tests', () => {
    let awsDynamoDBClientSpy: jest.SpyInstance;
    let client: IDynamoDBClient;

    beforeEach(() => {
        awsDynamoDBClientSpy = jest.spyOn(AWSDynamoDBClient.prototype, 'send').mockResolvedValue({} as never);

        client = new DynamoDBClient({
            region: 'us-west-1',
            endpoint: 'endpoint',
            tablePrefix: 'test.',
            credentials: { accessKeyId: 'key', secretAccessKey: 'secretKey' },
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Get', () => {
        it('Builds the GetCommand and sends it', async () => {
            await client.get('Table', {
                TableName: 'Table',
                Key: {
                    key: 'value',
                },
            });

            expect(awsDynamoDBClientSpy).toBeCalledTimes(1);
        });
    });

    describe('Query', () => {
        it('Builds the QueryCommand and sends it', async () => {
            await client.query('Table', {
                TableName: 'Table',
                IndexName: 'Index',
            });

            expect(awsDynamoDBClientSpy).toBeCalledTimes(1);
        });
    });

    describe('Save', () => {
        it('Builds the PutCommand and sends it', async () => {
            await client.save('Table', { key: 'value' });

            expect(awsDynamoDBClientSpy).toBeCalledTimes(1);
        });
    });

    describe('Batch Save', () => {
        it('Builds the BatchWriteCommand with PutRequests and sends it', async () => {
            await client.batchSave('Table', [{ foo: 'bar' }]);

            expect(awsDynamoDBClientSpy).toBeCalledTimes(1);
        });
    });

    describe('Batch Delete', () => {
        it('Builds the BatchWriteCommand with DeleteRequests and sends it', async () => {
            await client.batchDelete('Table', [{ foo: 'bar' }]);

            expect(awsDynamoDBClientSpy).toBeCalledTimes(1);
        });
    });

    describe('Save', () => {
        it('Builds the PutCommand and sends it', async () => {
            await client.save('Table', { key: 'value' });

            expect(awsDynamoDBClientSpy).toBeCalledTimes(1);
        });
    });

    describe('Create Table', () => {
        it('Builds the CreateTableCommand and sends it', async () => {
            await client.createTable({
                TableName: 'Table',
                KeySchema: [{ AttributeName: 'key', KeyType: 'HASH' }],
                AttributeDefinitions: [{ AttributeName: 'key', AttributeType: 'S' }],
            });

            expect(awsDynamoDBClientSpy).toBeCalledTimes(1);
        });
    });

    describe('Delete Table', () => {
        it('Builds the DeleteTableCommand and sends it', async () => {
            await client.deleteTable('Table');

            expect(awsDynamoDBClientSpy).toBeCalledTimes(1);
        });
    });
});
