import React from "react";

import { useAuth } from "../context/auth.context";
import { loguotUser } from "../services/auth.services";
import { toast } from "react-toastify";

const Home: React.FC = () => {
  const { logout } = useAuth();
const handleLogout=async()=>{
    try {
        const response=await loguotUser()
if(response.ok){
    logout()
}
    } catch (error:any) {
        console.log(error)

        toast.error(error.message)
    }
}
  return (
    <div>
      <h1>Home Page - Protected</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
};

export default Home;
