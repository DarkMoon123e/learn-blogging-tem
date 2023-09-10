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
import { categoryStatusArr } from "utils/constants";

const ManageCategory = () => {
  const { list: categoryList } = useFetchDoc("categories");

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
              <th>Created</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categoryList?.length > 0 &&
              categoryList.map((item) => (
                <CategoryItemTable data={item}></CategoryItemTable>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

const CategoryItemTable = ({ data }) => {
  const navigate = useNavigate();
  const { day, month, year } = useChangeTime(data.createdAt);
  const { handleDeleteDoc } = useDeleteDoc("categories", data.id);
  return (
    <tr>
      <th title={data?.id}>{data?.id.slice(0, 5) + "..."}</th>
      <th>
        <div className="flex items-center gap-x-3">
          <img
            src={data.img}
            alt=""
            className="object-cover w-8 h-8 rounded-full"
          />
          {data.name}
        </div>
      </th>
      <th>{`${day} / ${month} / ${year}`}</th>
      <th>{categoryStatusArr[data.status - 1]}</th>
      <th>
        <ActionGroupTable>
          <ActionEdit
            onClick={() =>
              navigate(`/manage/update-category?categoryId=${data.id}`)
            }
          ></ActionEdit>
          <ActionDelete onClick={handleDeleteDoc}></ActionDelete>
        </ActionGroupTable>
      </th>
    </tr>
  );
};

export default ManageCategory;
