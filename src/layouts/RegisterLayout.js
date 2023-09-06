import React from "react";
import { NavLink } from "react-router-dom";

const RegisterLayout = ({ children }) => {
  return (
    <>
      <div className="container flex flex-col items-center max-h-[100vh] p-5 gap-y-5">
        <div className="flex flex-col gap-y-5">
          <div className="flex justify-center">
            <NavLink to="/">
              <img srcSet="/logo.png 2x" alt="Monkey blogging" />
            </NavLink>
          </div>
          <NavLink to="/">
            <h1 className="mb-10 text-4xl font-bold text-primary">
              Monkey blogging
            </h1>
          </NavLink>
        </div>
        {children}
      </div>
    </>
  );
};

export default RegisterLayout;
