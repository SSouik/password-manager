// All Passwords should be encrypted

import { v4 as uuid } from 'uuid';

import DynamoDBClient from './client';

import { Client, Password } from '../libs/types/src';

const clientId = uuid();

const client = <Client>{
    clientId: clientId,
    login: 'local',
    password: 'P@ssword123', // should be encrypted
};

const password1 = <Password>{
    passwordId: uuid(),
    name: 'Password 1',
    website: 'https://foo.com',
    login: 'login',
    value: 'P@ssword123',
    clientId: clientId,
};

const password2 = <Password>{
    passwordId: uuid(),
    name: 'Password 1',
    website: 'https://foo.com',
    login: 'login',
    value: 'P@ssword123',
    clientId: clientId,
};

DynamoDBClient.save('Client', client);
DynamoDBClient.save('Password', password1);
DynamoDBClient.save('Password', password2);
