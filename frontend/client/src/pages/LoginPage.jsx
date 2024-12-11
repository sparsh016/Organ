import Login from "../components/Login"
import Header from "../components/Header"
import {Navigate ,Link} from "react-router-dom"
import { lookInSession } from "@/common/session"

const LoginPage=()=>{

    let userInSession=lookInSession("user");
    return (
        <>
        {
             (userInSession) ? <Navigate to="/"/>
               :
                <div className={`min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8  bg-donatebg bg-right ` }>
                <div className="max-w-md w-full space-y-8 ">
                <Header  heading="Hospital Login"
                        paragraph="Don't have an account? "
                        linkName="Register"
                        linkUrl="/register"/>

                    <Login/>
                </div>
                </div>
        }
        </>
    )
}

export default LoginPage