import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, Star, Users } from "lucide-react";

import { Button } from "./ui/button";
import { useUser } from "@/contexts/UserContext";

function TopNavBar() {
  const { userPoints } = useUser();
  const navigate = useNavigate();

  const handleLogOut = () => {
    console.log("click logout")
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-200/50 bg-white/90 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          
          {/* Logo and App Name */}
          <div className="flex items-center gap-3">
            <div className="flex items-right gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate(-1)}
                className="hover:bg-orange-100/80 text-gray-600 hover:text-orange-600 transition-colors"
              >
                <ArrowLeft size={20} />
              </Button>
              <div className="gradient-box p-2 rounded-xl shadow-lg">
                <Users size={24} className="text-white" />
              </div>
            </div>
            
            <h1 className="text-xl gradient-text">
            {/* <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent"> */}
              Connect Quest
            </h1>
          </div>
            
          <div className="flex items-center gap-3">
            {/* User Points */}
            <div className="flex items-center gap-1">
              <Star size={16} className="text-orange-500 " />
              <p>{userPoints} pts</p>
            </div>
            
            {/* Logout */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-orange-100/80 text-gray-600 hover:text-orange-600 transition-colors"
              onClick={() => handleLogOut()}
            >
              <LogOut size={20}/>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
export default TopNavBar;