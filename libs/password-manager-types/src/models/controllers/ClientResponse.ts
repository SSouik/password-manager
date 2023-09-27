import { Client } from '../Client';

// Removes the password property from the type
export type ClientResponse = Omit<Client, 'password'>;
