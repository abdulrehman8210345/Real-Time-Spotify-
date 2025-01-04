import { useSignIn } from "@clerk/clerk-react"
import { Button } from "./ui/button"

const SignInOAuthButtons = () => {

    const {signIn,isLoaded} = useSignIn();

    if(!isLoaded) return null;

    const signInWithGoogle = ()=>{
        signIn?.authenticateWithRedirect({
            strategy:"oauth_google",
            redirectUrl:"/sso-callback",
            redirectUrlComplete:"/auth-callback"
        })

    }
  return (
    <Button onClick={signInWithGoogle} variant={"secondary"} className="w-full h-11 text-white border-zinc-200">
      <img src="/google.png" alt="Google" className="size-5" />
      Continue With Google</Button>
  )
}

export default SignInOAuthButtons