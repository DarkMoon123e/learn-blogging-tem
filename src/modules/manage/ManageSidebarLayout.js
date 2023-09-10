import CategoryIcon from "components/icons/CategoryIcon";
import LogOutIcon from "components/icons/LogOut";
import PostIcon from "components/icons/PostIcon";
import UserIcon from "components/icons/UserIcon";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const manageLinkList = [
  { id: 1, name: "Post", to: "/manage/post", icon: <PostIcon></PostIcon> },
  {
    id: 2,
    name: "Category",
    to: "/manage/category",
    icon: <CategoryIcon></CategoryIcon>,
  },
  { id: 3, name: "User", to: "/manage/user", icon: <UserIcon></UserIcon> },
];

const ManageSidebarLayout = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want to sign out",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth);
        navigate("/");
        Swal.fire("You have just signed out", "success");
      }
    });
  };
  return (
    <div className="w-[300px] h-[300px] shadow-lg flex flex-col rounded-lg p-2">
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
      <button onClick={handleLogOut}>
        <div className="flex p-5 gap-x-5">
          <span>
            <LogOutIcon></LogOutIcon>
          </span>
          <span className="font-normal">Log out</span>
        </div>
      </button>
    </div>
  );
};

export default ManageSidebarLayout;
