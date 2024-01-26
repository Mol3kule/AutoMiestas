export type UserType = {
    id: number;
    userId: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    stripeCustomerId: string;
    organization: string | null;
    date_registered: string;
    admin_rank: number;
}