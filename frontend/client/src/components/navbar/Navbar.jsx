import {React} from "react-dom"
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { lookInSession } from "@/common/session";
import Navigation from "./Navigation";
import './nav.css';

const Navbar=()=>{

    const [isShow, setIsShow] = useState(true);
    const mobileMenuHandler=()=>{
        
    }

    let user=JSON.parse(lookInSession("user"));

    return (
        <>
        <div className="bg-green-600 text-white">
         {/* navigation for desktop and ipad devices and mobile menu */}
            <div className="md:w-9/12  w-100 md:px-0 px-4 mx-auto flex items-center justify-between py-1">
                <Link to="/" className="hosname">
                {user.hospitalname}
                </Link>
                <Navigation/>
                
                {/* // moblie menu button */}
                <button onClick={mobileMenuHandler} className="md:hidden block ">
                <GiHamburgerMenu className="text-3xl " />
                </button>
            </div>
            
        </div>
        </>
    )
}

export default Navbar