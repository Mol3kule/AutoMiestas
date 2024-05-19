export type UserType = {
    id: number;
    userId: string;
    stripeCustomerId: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    phone_number: string | null;
    organization: string | null;
    date_registered: Date;
    admin_rank: number;
}