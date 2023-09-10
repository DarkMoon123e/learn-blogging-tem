import { AuthProvider } from "contexts/auth-context";
import ManageLayout from "layouts/ManageLayout";
import AddCategory from "pages/AddCategory";
import AddPost from "pages/AddPost";
import AddUser from "pages/AddUser";
import HomePage from "pages/HomePage";
import ManageCategory from "pages/ManageCategory";
import ManagePost from "pages/ManagePost";
import ManageUser from "pages/ManageUser";
import SignInPage from "pages/SignInPage";
import SignUpPage from "pages/SignUpPage";
import UpdateCategory from "pages/UpdateCategory";
import UpdatePost from "pages/UpdatePost";
import UpdateUser from "pages/UpdateUser";
import React from "react";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
        <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>

        <Route element={<ManageLayout></ManageLayout>}>
          <Route
            path="/manage/post"
            element={<ManagePost></ManagePost>}
          ></Route>
          <Route
            path="/manage/category"
            element={<ManageCategory></ManageCategory>}
          ></Route>
          <Route
            path="/manage/user"
            element={<ManageUser></ManageUser>}
          ></Route>

          <Route path="/manage/add-post" element={<AddPost></AddPost>}></Route>
          <Route
            path="/manage/add-category"
            element={<AddCategory></AddCategory>}
          ></Route>
          <Route path="/manage/add-user" element={<AddUser></AddUser>}></Route>

          <Route
            path="/manage/update-post"
            element={<UpdatePost></UpdatePost>}
          ></Route>
          <Route
            path="/manage/update-category"
            element={<UpdateCategory></UpdateCategory>}
          ></Route>
          <Route
            path="/manage/update-user"
            element={<UpdateUser></UpdateUser>}
          ></Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
