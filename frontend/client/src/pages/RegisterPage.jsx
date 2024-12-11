import Header from "../components/Header";
import Register from "../components/Register";

export default function SignupPage(){
    return(
        <>
        <div className={`min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8  bg-donatebg bg-right ` }>
        <div className="max-w-md w-full space-y-8 ">
            <Header
              heading="Register as Hospital"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/"
            />
            <Register/>
            </div>
            </div>
        </>
    )
}