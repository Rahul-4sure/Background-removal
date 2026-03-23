import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useContext } from "react";
import { AppContext } from "../context/appContext";
import { useEffect } from "react";


const Navbar = () => {
  const { openSignIn } = useClerk();

  const { isSignedIn, user } = useClerk();

  const {credit,loadCreditsData} = useContext(AppContext)

  useEffect(()=>{

    if(isSignedIn){
      loadCreditsData()
    }

  },[isSignedIn])

  return (
    <div className="flex items-center justify-between mx-4 py-3 lg:mx-44">
      <Link to="/">
        {" "}
        <img src={assets.logo} alt="" className="w-32 sm:w-44" />{" "}
      </Link>
      {isSignedIn ? (
        <div>
          <UserButton />
        </div>
      ) : (
        <button
          onClick={() => openSignIn({})}
          className="border rounded-full bg-zinc-800 text-white flex gap-4 items-center px-4 py-2 sm:py-3 text-sm cursor-pointer"
        >
          Get Started
          <img src={assets.arrow_icon} className="w-3 sm:w-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
