import { useState } from 'react';
import { signupFields } from "../components/Formfields"
import Input from "./Input";
import {Toaster,toast} from "react-hot-toast"
import axios from "axios";
import { storeInSession ,lookInSession} from "../common/session"
import {Navigate,Link} from "react-router-dom";



const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

const Signup=()=>{
  const [signupState,setSignupState]=useState(fieldsState);// all hospital register data

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});


  function refreshPage() {
    window.location.reload(false);
  }

  const handleSubmit=async (e)=>{

    e.preventDefault();
     //console.log(signupState)

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
     let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
          
     let {hospitalname,email,address,phone,password}= signupState;//destructure the data

     //console.log(hospitalname +" "+email+" "+address+" "+phone+" "+password)

      if(hospitalname.length < 3 || address.length <3){
        return toast.error("Hospital Name and Address must be at least 3 letters long")
      }
    
      if(!email.length){
          return toast.error("Email is required");
      }
      
      if(!emailRegex.test(email)){// checking whether email follows a acertain pattern or not
        return toast.error( "Invalid Email Address");
      }

      if(phone.length !== 10){
        return toast.error("Phone length should be of 10 digits");
      }

      if(!passwordRegex.test(password)){
          return toast.error("Password should be 6 to 20 characters long with 1 numeric,1 lowercase and 1 uppercase letters")
      }
       
    await createAccount(signupState);
    setTimeout(refreshPage,2000);
  }

  //handle Signup API Integration here
  const createAccount=async (signupState)=>{
        
    await axios.post(import.meta.env.VITE_SERVER_DOMAIN+'/register',signupState)
    .then(({data})=>{
      storeInSession("user",JSON.stringify(data))
       return toast("Registered Successfully");
    })
    .catch(({response})=>{
      toast.error(response.data.error)
    })
  }


  let userInSession=JSON.parse(lookInSession("user"));

    return(
      <>
      {
        (userInSession)?<Navigate to="/"/>
        :
        <form className="mt-8 space-y-6" >
          <Toaster/>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
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
        <button onClick={handleSubmit} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10">
          Register
        </button>
        
        </div>

        </form>
      
      } 
      </>
    )
}

export default Signup