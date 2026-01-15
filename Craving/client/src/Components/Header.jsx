import React from "react";
import transparent from "../assets/transparent.png";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-(--color-primary) px-4 py-2 flex justify-between items-center">
        <Link to={"/"}>
          <img
            src={transparent}
            alt=""
            className="h-12 w-20 object-cover invert-100"
          />
        </Link>
        <div className="flex gap-4">
          <Link
            to={"/"}
            className="text-decoration-none text-white hover:text-(--color-accent)"
          >
            {" "}
            Home
          </Link>
          <Link
            to={"/about"}
            className="text-decoration-none text-white hover:text-(--color-accent)"
          >
            {" "}
            About
          </Link>
          <Link
            to={"/contact"}
            className="text-decoration-none text-white hover:text-(--color-accent)"
          >
            {" "}
            Contact
          </Link>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-(--color-secondary)  py-2 px-4 font-bold hover:bg-(--color-secondary-hover) hover:text-white rounded "
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-(--color-secondary)  py-2 px-4 font-bold hover:bg-(--color-secondary-hover) hover:text-white rounded "
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
