export type DashboardComponentBannerButton = {
    label: string;
};

export type DashboardComponentBanner = {
    title: string;
    message: string;
    variant: 'info' | 'warn' | 'error';
    button: DashboardComponentBannerButton;
};

export type DashboardComponentConfig = {
    banner: {
        createPassword: DashboardComponentBanner;
        error: DashboardComponentBanner;
    };
};

export default <DashboardComponentConfig>{
    banner: {
        createPassword: {
            title: 'Create a Password',
            message:
                "Welcome to Password Manager! Here you will see a list of all the passwords you create. Right now you don't have any so let's get started by creating your first one.",
            variant: 'info',
            button: {
                label: 'Create Password',
            },
        },
        error: {
            title: 'Something went wrong',
            message:
                'Unfortunately, something went wrong and we are not able to get your passwords at the moment. Please try again later or refresh the page.',
            variant: 'error',
            button: {
                label: 'Try Again',
            },
        },
    },
};
