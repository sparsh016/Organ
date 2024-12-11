import Navbar from "../components/navbar/Navbar.jsx"
import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <div className="header">
       <Navbar/>
      </div>
      <div className="row g-0">
        
        <div className="col-md-9">{children}</div>
      </div>
    </>
  );
};

export default Layout;