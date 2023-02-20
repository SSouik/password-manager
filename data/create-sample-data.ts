// All Passwords should be encrypted

import { v4 as uuid } from 'uuid';

import DynamoDBClient from './client';
import Crypto from './crypto';

import { Client, Password, SecurityQuestion } from '../libs/password-manager-types/src';

const clientId = uuid();

const client = <Client>{
    clientId: clientId,
    login: 'local',
    password: Crypto.encrypt('P@ssword123'),
};

const securityQuestion = <SecurityQuestion>{
    questionId: uuid(),
    question: 'What is the name of your cat?',
    answer: Crypto.encrypt('Quavo'),
    clientId: clientId,
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
    name: 'Password 1',
    website: 'https://foo.com',
    login: 'login',
    value: Crypto.encrypt('P@ssword123'),
    clientId: clientId,
};

DynamoDBClient.save('Client', client);
DynamoDBClient.save('Password', password1);
DynamoDBClient.save('Password', password2);
DynamoDBClient.save('SecurityQuestion', securityQuestion);
