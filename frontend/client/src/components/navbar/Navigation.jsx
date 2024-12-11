import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { ImUser } from "react-icons/im";
import { CgMenuGridO } from "react-icons/cg";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineMedicalServices } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { removeFromSession } from "@/common/session";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './nav.css'

const Navigation=()=> {
  
  const navigate=useNavigate();

  const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

  const handleLogout=()=>{
        removeFromSession("user");
        alert("Logging Out");
        setTimeout(navigate("/login"),4000);
  }
 
  return (
    <div className="md:flex justify-center py-3 items-center space-x-3  hidden">
        <Toaster/>

      <NavLink
        to="/"
        className="hover:text-gray-100  px-3 py-2 rounded-md font-bold hover:bg-gray-600 text-gray-100 transition-all flex items-center"
      >
        <CgMenuGridO className="mr-1 text-xl" />
        Home
      </NavLink>


      <NavLink
        className="hover:text-gray-100 px-3 py-2 rounded-md font-bold hover:bg-gray-600 text-gray-100 transition-all flex items-center"
      >
        <MdOutlineMedicalServices className="mr-1 text-xl" />
        <div className="dropdown">
            <button className="dropbtn" onClick={toggleDropdown}>Services</button>
            {isOpen && (
                <div className="dropdown-content">
                    <NavLink to="/addpatient">AddPatient</NavLink>
                    <NavLink to="/organ-match">Organ Matching</NavLink>
                </div>
            )}
        </div>
      </NavLink>

      <NavLink
        className="hover:text-gray-100 px-3 py-2 rounded-md font-bold hover:bg-gray-600 text-gray-100 transition-all flex items-center"
      >
       <ImUser className="mr-1 text-xl" />
        <div className="dropdown">
            <button className="dropbtn" onClick={toggleDropdown}>Doctors</button>
            {isOpen && (
                <div className="dropdown-content">
                    <NavLink to="/add-doctor">Add doctor</NavLink>
                    <NavLink to="/view-doctors">View doctors</NavLink>
                </div>
            )}
        </div>
      </NavLink>

      <button  onClick={handleLogout} className="logoutbtn rounded px-2 py-2">
        Logout
      </button>
    </div>
  );
};

export default Navigation;