import { CreateTableCommandInput, CreateTableCommandOutput, DeleteTableCommandOutput } from '@aws-sdk/client-dynamodb';
import {
    GetCommandInput,
    GetCommandOutput,
    PutCommandOutput,
    QueryCommandInput,
    QueryCommandOutput,
} from '@aws-sdk/lib-dynamodb';

export interface IDynamoDBClient {
    get(table: string, input: GetCommandInput): Promise<GetCommandOutput>;
    query(table: string, input: QueryCommandInput): Promise<QueryCommandOutput>;
    save<T>(table: string, data: T): Promise<PutCommandOutput>;
    createTable(tableConfig: CreateTableCommandInput): Promise<CreateTableCommandOutput>;
    deleteTable(table: string): Promise<DeleteTableCommandOutput>;
}
