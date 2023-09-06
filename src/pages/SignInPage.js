import Button from "components/Button";
import FormField from "components/form/FormField";
import Input from "components/form/Input";
import Label from "components/form/Label";
import RegisterLayout from "layouts/RegisterLayout";
import React from "react";
import { NavLink } from "react-router-dom";

const SignInPage = () => {
  return (
    <>
      <RegisterLayout>
        <form>
          <FormField>
            <Label htmlFor="email">Email address</Label>
            <Input id="email" placeHolder="Enter your email address"></Input>
          </FormField>
          <FormField>
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeHolder="Enter your password"></Input>
          </FormField>
          <p className="mb-5 font-medium">
            If you have an account,{" "}
            <NavLink to="/sign-up" className="text-base text-primary">
              Sign up
            </NavLink>
          </p>
          <div className="text-center">
            <Button type="submit">Sign in</Button>
          </div>
        </form>
      </RegisterLayout>
    </>
  );
};

export default SignInPage;
