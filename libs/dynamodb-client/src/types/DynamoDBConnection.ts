export type DynamoDBConnection = {
    tablePrefix: string;
    region: 'us-east-1' | 'us-east-2' | 'us-west-1' | 'us-west-2';
    endpoint: string;
};
