export interface SubscriptionRequestBody {
    fullName: string;
    email: string;
}

export interface EmailPayload {
    from: {email: string, name: string};
    to: {email: string, name: string}[];
    subject: string;
    text: string;
    html?: string;
    category?: string;
}

