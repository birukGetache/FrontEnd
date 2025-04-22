"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import BoatOwner from "../components/boatowner"; // Assuming you have this component
import Blog from "../components/blog"; // Assuming you have this component
import Chart from "../components/chart"; // Assuming you have this component
import Sponser from "../components/Sponser";
import Login from "../components/Login"
import Booking from '../components/Booking'
import Destination from '../components/Destination'
const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("chart"); // Default is Chart
  const [Loginsuccess ,setLoginSuccess ] = useState(false);
  const router = useRouter();
  const renderComponent = () => {
    switch (activeComponent) {
      case "boatowner":
        return <BoatOwner />;
      case "blog":
        return <Blog />;
      case "chart":
        return <Chart />;
      case "sponser":
        return <Sponser />;
      case "Destination":
        return <Destination />;
      case "Booking":
        return <Booking />;
      default:
        return <Chart />;
    }
  };

  return (
 <>
      {
          !Loginsuccess ?(
          <Login setLoginSuccess = {setLoginSuccess}></Login> 
           )
       : 
          <div className="flex">
          <Sidebar setActiveComponent={setActiveComponent} />
          <div className="flex-1 h-screen overflow-auto">{renderComponent()}</div>
        </div>
      }  
     </>    
  );
};

export default AdminDashboard;