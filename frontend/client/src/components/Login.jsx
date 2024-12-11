import { useEffect, useState } from 'react';
import { loginFields } from "../components/Formfields";
import Input from "./Input";
import axios from "axios";
import { Toaster, toast } from 'react-hot-toast';
import { lookInSession, storeInSession } from "../common/session"
import {Navigate ,Link} from "react-router-dom";

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');



const Login=()=>{
    const [loginState,setLoginState]=useState(fieldsState);
    

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }
    
    function refreshPage() {
        window.location.reload(false);
      }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        await authenticateUser();
        setTimeout(refreshPage,2000);
    }

    //Handle Login API Integration here
    const authenticateUser =async  () =>{
        await axios.post(import.meta.env.VITE_SERVER_DOMAIN+'/login',loginState)
        .then(({data})=>{
        storeInSession("user",JSON.stringify(data))
          toast("Logged In Succefully");

        })
        .catch(({response})=>{
        toast.error(response.data.error)
        })
    }

    let accessToken=JSON.parse(lookInSession("user"));

    return(
        <>
        {   
            
            <form className="mt-8 space-y-6">
                <Toaster/>
            <div className="-space-y-px">
                {
                    fields.map(field=>
                            <Input
                                key={field.id}
                                handleChange={handleChange}
                                value={loginState[field.id]}
                                labelText={field.labelText}
                                labelFor={field.labelFor}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                isRequired={field.isRequired}
                                placeholder={field.placeholder}
                        />
                    
                    )
                }
            </div>

            
            <button onClick={handleSubmit} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10">
                Login
            </button>
            
        

            </form>
        
        
            } 
            </>
    )
   
}

export default Login