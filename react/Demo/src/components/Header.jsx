import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="d-flex gap-3 justify-content-end p-3 bg-primary">
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
      <h1 id="head" className="text-center mt-5  ">
        <i class="bi bi-symmetry-vertical"></i> Hello World
      </h1>
    </>
  );
};

export default Header;
