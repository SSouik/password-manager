import {
    CreateTableCommand,
    CreateTableCommandInput,
    CreateTableCommandOutput,
    DeleteTableCommand,
    DeleteTableCommandOutput,
    DynamoDBClient as AWSDynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import {
    GetCommandInput,
    GetCommandOutput,
    GetCommand,
    PutCommandInput,
    PutCommandOutput,
    PutCommand,
} from '@aws-sdk/lib-dynamodb';

import { IDynamoDBClient, DynamoDBConnection } from './types';

export class DynamoDBClient implements IDynamoDBClient {
    private readonly dynamoDBClient: AWSDynamoDBClient;

    constructor(private readonly dynamoDBConnection: DynamoDBConnection) {
        this.dynamoDBClient = new AWSDynamoDBClient({
            region: dynamoDBConnection.region,
            endpoint: dynamoDBConnection.endpoint,
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

    public save<T>(table: string, data: T): Promise<PutCommandOutput> {
        const params = <PutCommandInput>{
            TableName: this.buildTableName(table),
            Item: JSON.parse(JSON.stringify(data)),
        };

        const command = new PutCommand(params);

        return this.dynamoDBClient.send(command);
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
}
