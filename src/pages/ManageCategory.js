import Button from "components/Button";
import ActionDelete from "components/TableActions/ActionDelete";
import ActionEdit from "components/TableActions/ActionEdit";
import ActionView from "components/TableActions/ActionView";
import ManageTitle from "modules/manage/ManageTitle";
import Table from "modules/manage/Table";
import React from "react";

const ManageCategory = () => {
  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <ManageTitle
            title="Categories"
            decs="Manage all Categories"
          ></ManageTitle>
          <Button to="/manage/add-category">Add category</Button>
          {/* search */}
        </div>
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>SLug</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>561651615esdfs</th>
              <th>
                {/* <div className="flex items-center gap-x-3">
                  <img
                    src={defaultImg}
                    alt=""
                    className="object-cover w-10 h-10 rounded-lg"
                  />
                  <div className="text-start">
                    <p>How to create a new account</p>
                    <p className="italic font-light">Date: 4/9/2023</p>
                  </div>
                </div> */}
              </th>
              <th></th>
              <th></th>
              <th>
                <div className="flex items-center gap-x-3">
                  <ActionView></ActionView>
                  <ActionEdit></ActionEdit>
                  <ActionDelete></ActionDelete>
                </div>
              </th>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ManageCategory;
