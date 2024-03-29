// All Passwords should be encrypted

import { v4 as uuid } from 'uuid';

import DynamoDBClient from './client';
import Crypto from './crypto';

import { Client, Password } from '../libs/password-manager-types/src';

const clientId = uuid();

const client = <Client>{
    clientId: clientId,
    login: 'local',
    password: Crypto.encrypt('P@ssword123'),
};

const password1 = <Password>{
    passwordId: uuid(),
    name: 'Password 1',
    website: 'https://foo.com',
    login: 'login',
    value: Crypto.encrypt('P@ssword123'),
    clientId: clientId,
};

const password2 = <Password>{
    passwordId: uuid(),
    name: 'Password 2',
    website: 'https://bar.com',
    login: 'login',
    value: Crypto.encrypt('P@ssword123'),
    clientId: clientId,
};

DynamoDBClient.save('Client', client);
DynamoDBClient.batchSave('Password', [password1, password2]);
