import { Password } from '../Password';

// Removed the value property from the type
export type PasswordResponse = Omit<Password, 'value'>;
