export type LoginComponentError = {
    invalidCredentials: string;
    generic: string;
};

export type LoginComponentConfig = {
    error: LoginComponentError;
};

export default <LoginComponentConfig>{
    error: {
        invalidCredentials: 'Username and Password combination is incorrect. Please try again.',
        generic: 'An unexpected error occurred. Please try again.',
    },
};
