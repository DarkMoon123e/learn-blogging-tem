import FormField from "components/form/FormField";
import Input from "components/form/Input";
import Label from "components/form/Label";
import ManageTitle from "modules/manage/ManageTitle";
import React from "react";

const AddUser = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <ManageTitle title="Add user" decs="Create a new user"></ManageTitle>
      </div>
      <div className="mb-10"></div>
      <div>
        <div className="flex gap-x-5">
          <FormField>
            <Label htmlFor="email">Email address</Label>
            <Input id="email" placeHolder="Enter your email address"></Input>
          </FormField>
          <FormField>
            <Label htmlFor="email">Email address</Label>
            <Input id="email" placeHolder="Enter your email address"></Input>
          </FormField>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
