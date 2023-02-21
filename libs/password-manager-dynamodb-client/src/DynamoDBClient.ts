import {
    CreateTableCommand,
    CreateTableCommandInput,
    CreateTableCommandOutput,
    DeleteTableCommand,
    DeleteTableCommandOutput,
    DynamoDBClient as AWSDynamoDBClient,
    WriteRequest,
} from '@aws-sdk/client-dynamodb';
import {
    BatchWriteCommandInput,
    BatchWriteCommandOutput,
    GetCommandInput,
    GetCommandOutput,
    GetCommand,
    PutCommandInput,
    PutCommandOutput,
    PutCommand,
    QueryCommandInput,
    QueryCommandOutput,
    QueryCommand,
    BatchWriteCommand,
} from '@aws-sdk/lib-dynamodb';

import { IDynamoDBClient, DynamoDBConnection } from './types';

export class DynamoDBClient implements IDynamoDBClient {
    private readonly dynamoDBClient: AWSDynamoDBClient;

    constructor(private readonly dynamoDBConnection: DynamoDBConnection) {
        this.dynamoDBClient = new AWSDynamoDBClient({
            region: dynamoDBConnection.region,
            endpoint: dynamoDBConnection.endpoint,
            credentials: dynamoDBConnection.credentials,
        });
    }

    public get(table: string, input: GetCommandInput): Promise<GetCommandOutput> {
        const params = <GetCommandInput>{
            ...input,
            TableName: this.buildTableName(table),
        };

        const command = new GetCommand(params);

        return this.dynamoDBClient.send(command);
    }

    public query(table: string, input: QueryCommandInput): Promise<QueryCommandOutput> {
        const params = <QueryCommandInput>{
            ...input,
            TableName: this.buildTableName(table),
        };

        const command = new QueryCommand(params);

        return this.dynamoDBClient.send(command);
    }

    public save<T>(table: string, data: T): Promise<PutCommandOutput> {
        const params = <PutCommandInput>{
            TableName: this.buildTableName(table),
            Item: JSON.parse(JSON.stringify(data)),
        };

        const command = new PutCommand(params);

        return this.dynamoDBClient.send(command);
    }

    public batchSave<T>(table: string, data: Array<T>): Promise<BatchWriteCommandOutput> {
        const tableName = this.buildTableName(table);

        const requests: Array<WriteRequest> = data.map((item) => {
            return {
                PutRequest: {
                    Item: JSON.parse(JSON.stringify(item)),
                }
            }
        });

        return this.dynamoDBClient.send(this.buildBatchWriteCommand(tableName, requests));
    }

    public batchDelete<T>(table: string, keys: Array<T>): Promise<BatchWriteCommandOutput> {
        const tableName = this.buildTableName(table);

        const requests: Array<WriteRequest> = keys.map((key) => {
            return {
                DeleteRequest: {
                    Key: JSON.parse(JSON.stringify(key)),
                }
            }
        });

        return this.dynamoDBClient.send(this.buildBatchWriteCommand(tableName, requests));
    }

    public createTable(tableConfig: CreateTableCommandInput): Promise<CreateTableCommandOutput> {
        const tableName = this.buildTableName(String(tableConfig.TableName));
        return this.dynamoDBClient.send(
            new CreateTableCommand({
                ...tableConfig,
                TableName: tableName,
            }),
        );
    }

    public deleteTable(table: string): Promise<DeleteTableCommandOutput> {
        return this.dynamoDBClient.send(new DeleteTableCommand({ TableName: this.buildTableName(table) }));
    }

    /**
     * Add the table prefix to the provided table name
     * @param table Name of the DynamoDB table
     * @returns Name of the table with the configured prefix
     */
    private buildTableName(table: string): string {
        return `${this.dynamoDBConnection.tablePrefix}${table}`;
    }

    /**
     * Build the batch write command for creating and deleting records in a table
     * @param table Name of the DynamoD table
     * @param requests An array of DeleteRequests or PutRequests
     * @returns The batch write command to send to DynamoDB
     */
    private buildBatchWriteCommand(table: string, requests: Array<WriteRequest>): BatchWriteCommand {
        return new BatchWriteCommand(<BatchWriteCommandInput>{
            RequestItems: {
                [table]: requests
            }
        });
    }
}
