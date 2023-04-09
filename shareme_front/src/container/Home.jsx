import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import { SideBar, UserProfile } from "../components";
import { client } from "../client";
import logo from "../assets/logo.png";
import Pins from "./Pins";
import { userQuery } from "../utils/data";
import jwt_decode from "jwt-decode";
import { fetchUser } from "../utils/fetchUser";
const Home = () => {
  const [toogleSidebar, setToogleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const userInfo = fetchUser();

  var decodedHeader = jwt_decode(userInfo.credential);
  const { name, sub, picture } = decodedHeader;
  useEffect(() => {
    const query = userQuery(sub);
    client.fetch(query).then((data) => setUser(data[0]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });

  return (
    <div className="flex bg-grey-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      {/* hidden for all display types
          md:flexd - shoes only for medium devices */}
      <div className="hidden md:flex  h-screen flex-initial">
        <SideBar user={user && user} />
      </div>
      {/* flex - fora ll devices 
          hidden for medium devices */}
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full h-25 flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToogleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          {/* pulling user from local storage we saved in login */}
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className="w-26" />
          </Link>
        </div>
        {toogleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToogleSidebar(false)}
              />
            </div>
            <SideBar user={user && user} closeToggle={setToogleSidebar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;