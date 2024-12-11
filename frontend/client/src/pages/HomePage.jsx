import { lookInSession } from "../common/session"
import { useEffect } from "react";
import {Navigate} from "react-router-dom"

import Layout from "./Layout";
import {Routes,Route} from "react-router-dom";
import HomeTable from "../components/HomeTable";
import OrganMatching from "../components/Organ-match/OrganMatching";
import AddPatient from "../components/AddPatientForm/src/AddPatient";
import AddDoctor from "../components/AddDoctor/AddDoctor";
import ViewDoctors from "@/components/viewDoctors/ViewDoctors";

const HomePage= ()=>{

    let userInSession= JSON.parse(lookInSession("user"))
    
    return (
        <>
            {
                !(userInSession)? <Navigate to="/login"/>
                :
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomeTable/>}/>
                        <Route path="/addpatient" element={<AddPatient/>}/>
                        <Route path="/organ-match" element={<OrganMatching/>}/>
                        <Route path="/add-doctor" element={<AddDoctor/>}/>
                        <Route path="/view-doctors" element={<ViewDoctors/>} />
                    </Routes>
                </Layout>
            }
        </>
    )
}

export default HomePage