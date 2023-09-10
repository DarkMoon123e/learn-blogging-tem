import Button from "components/Button";
import { useAuth } from "contexts/auth-context";
import React from "react";
import { NavLink } from "react-router-dom";
import { defaultImg } from "utils/constants";

const ManageHeaderLayout = () => {
  const { userInfo } = useAuth();
  const userImg = userInfo?.photoURL;
  return (
    <div className="flex items-center justify-between mb-10 border-b-slate-500">
      <NavLink to="/" className="flex items-center gap-x-5">
        <img srcSet="/logo.png 2x" alt="Monkey blogging" className="w-10" />
        <p className="font-bold">Monkey blogging</p>
      </NavLink>
      <div className="flex items-center gap-x-5">
        <Button to="/manage/add-post">Write new post</Button>
        <NavLink to={`/manage/update-user?userId=${userInfo.uid}`}>
          <img
            src={userImg}
            alt=""
            className="object-cover w-10 h-10 rounded-full"
          />
        </NavLink>
      </div>
    </div>
  );
};

export default ManageHeaderLayout;
