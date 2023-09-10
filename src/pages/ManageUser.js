import Button from "components/Button";
import ActionDelete from "components/TableActions/ActionDelete";
import ActionEdit from "components/TableActions/ActionEdit";
import useChangeTime from "hooks/useChangeTime";
import useDeleteDoc from "hooks/useDeleteDoc";
import useFetchDoc from "hooks/useFetchDoc";
import ActionGroupTable from "modules/manage/ActionGroupTable";
import ManageTitle from "modules/manage/ManageTitle";
import Table from "modules/manage/Table";
import React from "react";
import { useNavigate } from "react-router-dom";
import { userRoleArr, userStatusArr } from "utils/constants";

const ManageUser = () => {
  const { list: userList } = useFetchDoc("users");
  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <ManageTitle title="Users" decs="Manage all users"></ManageTitle>
          <Button to="/manage/add-user">Add user</Button>
          {/* search */}
        </div>
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Info</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userList?.length > 0 &&
              userList.map((item) => (
                <UserItemTable key={item.id} data={item}></UserItemTable>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

const UserItemTable = ({ data }) => {
  const navigate = useNavigate();
  const { day, month, year } = useChangeTime(data.createdAt);
  const { handleDeleteDoc } = useDeleteDoc("users", data.id);
  return (
    <tr>
      <th title={data.id}>{data.id.slice(0, 5) + "..."}</th>
      <th>
        <div className="flex items-center gap-x-3">
          <img
            src={data.img}
            alt=""
            className="object-cover w-10 h-10 rounded-lg"
          />
          <div className="text-start">
            <p>{data.fullName}</p>
            <p className="italic font-light">
              Date: {`${day} / ${month} / ${year}`}
            </p>
          </div>
        </div>
      </th>
      <th title={data.email}>{data.email.slice(0, 5) + "..."}</th>
      <th>{userStatusArr[data.status - 1]}</th>
      <th>{userRoleArr[data.status - 1]}</th>
      <th>
        <ActionGroupTable>
          <ActionEdit
            onClick={() => navigate(`/manage/update-user?userId=${data.id}`)}
          ></ActionEdit>
          <ActionDelete onClick={handleDeleteDoc}></ActionDelete>
        </ActionGroupTable>
      </th>
    </tr>
  );
};

export default ManageUser;
