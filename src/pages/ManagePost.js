import Button from "components/Button";
import ActionDelete from "components/TableActions/ActionDelete";
import ActionEdit from "components/TableActions/ActionEdit";
import ManageTitle from "modules/manage/ManageTitle";
import Table from "modules/manage/Table";
import useFetchDoc from "hooks/useFetchDoc";
import useChangeTime from "hooks/useChangeTime";
import { postStatusArr } from "utils/constants";
import useDeleteDoc from "hooks/useDeleteDoc";
import ActionGroupTable from "modules/manage/ActionGroupTable";
import { useNavigate } from "react-router-dom";

const ManagePost = () => {
  const { list: postList } = useFetchDoc("posts");
  console.log("file: ManagePost.js:14 ~ ManagePost ~ postList:", postList);

  return (
    <div>
      <div className="flex items-center justify-between">
        <ManageTitle title="Posts" decs="Manage all posts"></ManageTitle>
        <Button to="/manage/add-post">Add post</Button>
        {/* search */}
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {postList?.length > 0 &&
            postList.map((item) => (
              <PostItemTable key={item.id} data={item}></PostItemTable>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

const PostItemTable = ({ data }) => {
  const navigate = useNavigate();
  const { day, month, year } = useChangeTime(data.createdAt);
  const { handleDeleteDoc } = useDeleteDoc("posts", data.id);
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
            <p>{data.tittle}</p>
            <p className="italic font-light">
              Date: {`${day} / ${month} / ${year}`}
            </p>
          </div>
        </div>
      </th>
      <th>{data.category.name}</th>
      <th>{data.author}</th>
      <th>{postStatusArr[data.status - 1]}</th>
      <th>
        <ActionGroupTable>
          <ActionEdit
            onClick={() => navigate(`/manage/update-post?postId=${data.id}`)}
          ></ActionEdit>
          <ActionDelete onClick={handleDeleteDoc}></ActionDelete>
        </ActionGroupTable>
      </th>
    </tr>
  );
};

export default ManagePost;
