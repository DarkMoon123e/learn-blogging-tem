import Button from "components/Button";
import CategoryIcon from "components/icons/CategoryIcon";
import LogOutIcon from "components/icons/LogOut";
import PostIcon from "components/icons/PostIcon";
import UserIcon from "components/icons/UserIcon";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { defaultImg } from "utils/constants";

const ManageLayout = () => {
  return (
    <div className="container-b">
      <div className="flex items-center justify-between mb-10 border-b-slate-500">
        <div className="flex items-center gap-x-5">
          <NavLink to="/">
            <img srcSet="/logo.png 2x" alt="Monkey blogging" className="w-10" />
          </NavLink>
          <p className="font-bold">Monkey blogging</p>
        </div>
        <div className="flex items-center gap-x-5">
          <Button to="/manage/add-post">Write new post</Button>
          <NavLink>
            <img
              src={defaultImg}
              alt=""
              className="object-cover w-10 h-10 rounded-full"
            />
          </NavLink>
        </div>
      </div>
      <div className="flex gap-x-10">
        <div className="w-[300px] shadow-lg flex flex-col rounded-lg p-2">
          {manageLinkList.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "bg-primary bg-opacity-20" : ""
              }
            >
              <div className="flex p-5 gap-x-5">
                <span>{item.icon}</span>
                <span className="font-normal">{item.name}</span>
              </div>
            </NavLink>
          ))}
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

const manageLinkList = [
  { id: 1, name: "Post", to: "/manage/post", icon: <PostIcon></PostIcon> },
  {
    id: 2,
    name: "Category",
    to: "/manage/category",
    icon: <CategoryIcon></CategoryIcon>,
  },
  { id: 3, name: "User", to: "/manage/user", icon: <UserIcon></UserIcon> },
  {
    id: 4,
    name: "Logout",
    to: "",
    icon: <LogOutIcon></LogOutIcon>,
  },
];

export default ManageLayout;
