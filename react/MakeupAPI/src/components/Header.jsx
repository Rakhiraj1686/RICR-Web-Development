import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdContacts } from "react-icons/md";

const Header = () => {
  return (
    <>
      <div className="flex justify-evenly bg-blue-950">
        <div className=" text-4xl flex  text-white p-1">MakeupApi</div>
        <div className="flex  gap-4 text-2xl text-white py-3">
          <Link to={"/"} className="text-decoration-none flex text-light">
            {" "}
            <FaHome />
            Home
          </Link>
          <Link to={"/About"} className="text-decoration-none flex text-ligth">
            About
          </Link>
          <Link
            to={"/Contact"}
            className="text-decoration-none flex text-light"
          >
            <MdContacts />
            Contact
          </Link>
        </div>
      </div>
      
    </>
  );
};
export default Header;
