export type Client = {
    clientId: string;
    login: string;
    password: string;
    verification: {
        question: string;
        answer: string;
    };
};
