import axios from "axios";
import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const SignInWithGooglePage = async () => {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const userData = await clerkClient.users.getUser(userId);
    if (userData) {
        // Check if user is in database
        const response = await axios.post(`${process.env.defaultApiEndpoint}/api/auth/createUser`, {
            userId,
            emailAddress: userData.emailAddresses[0].emailAddress,
            first_name: userData.firstName,
            last_name: userData.lastName
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.data);

        if (response.status === 200) {
            redirect('/');
        } else {
            redirect('/sign-in');
        }
    }
};

export default SignInWithGooglePage;