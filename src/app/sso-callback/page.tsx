import { AuthenticateWithRedirectCallback } from "@clerk/nextjs"

const SSOCallbackPage = () => {
    return (
        <AuthenticateWithRedirectCallback afterSignInUrl={'/google-sign-in'} afterSignUpUrl={'/google-sign-in'} />
    )
}

export default SSOCallbackPage;