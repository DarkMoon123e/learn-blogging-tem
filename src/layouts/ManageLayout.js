import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ManageHeaderLayout from "modules/manage/ManageHeaderLayout";
import ManageSidebarLayout from "modules/manage/ManageSidebarLayout";

const ManageLayout = () => {
  useEffect(() => {
    document.title = "Manage";
  }, []);
  return (
    <div className="container-b">
      <ManageHeaderLayout></ManageHeaderLayout>
      <div className="flex gap-x-10">
        <ManageSidebarLayout></ManageSidebarLayout>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default ManageLayout;
