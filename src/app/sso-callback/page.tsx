import { AuthenticateWithRedirectCallback } from "@clerk/nextjs"

const SSOCallbackPage = () => {
    return (
        <AuthenticateWithRedirectCallback afterSignInUrl={'/sign-in'} afterSignUpUrl={'/sign-in'} />
    )
}

export default SSOCallbackPage;