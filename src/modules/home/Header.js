import Button from "components/Button";
import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="container flex items-center gap-x-5">
      <div className="max-w-[50px]">
        <NavLink to="/">
          <img
            srcSet="/logo.png 2x"
            alt="Monkey blogging"
            className="w-full h-full"
          />
        </NavLink>
      </div>
      <ul className="flex items-center gap-x-5">
        {linkList.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "text-primary font-bold" : "font-bold"
            }
          >
            {item.name}
          </NavLink>
        ))}
      </ul>
      <div className="flex justify-end flex-1"></div>
      <Button to="/sign-in">Sign in</Button>
    </div>
  );
};

const linkList = [
  {
    id: 1,
    to: "/",
    name: "Home",
  },
  {
    id: 2,
    to: "/blog",
    name: "Blog",
  },
  {
    id: 3,
    to: "/contact",
    name: "Contact",
  },
];

export default Header;
