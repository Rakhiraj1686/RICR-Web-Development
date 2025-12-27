import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <h1 id="head" className="text-center mt-5">
        <i class="bi bi-symmetry-vertical"></i> Hello World
      </h1>
      <div className="d-flex gap-3 ">
        <Link to={"/"} className="text-decoration-none text-light">
          Home
        </Link>
        <Link to={"/about"} className="text-decoration-none text-light">
          About
        </Link>
        <Link to={"/product"} className="text-decoration-none text-light">
          Product
        </Link>
        <Link to={"/contact"} className="text-decoration-none text-light">
          Contact
        </Link>
      </div>
    </>
  );
};

export default Header;
