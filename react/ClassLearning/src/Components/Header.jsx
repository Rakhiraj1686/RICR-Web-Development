import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="flex bg-blue-500 text-white p-2 justify-between items-center">
        <h3>My Website</h3>
        <div className="flex gap-3">
          <Link to={"/"} className="text-decoration-none text-light">
            Home
          </Link>
          <Link to={"/register"} className="text-decoration-none text-light">
            Register
          </Link>
          <Link to={"register1"} className="text-decoration-none text-light">
            Register1
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
