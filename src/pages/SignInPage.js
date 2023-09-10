import Button from "components/Button";
import FormField from "components/form/FormField";
import Input from "components/form/Input";
import Label from "components/form/Label";
import RegisterLayout from "layouts/RegisterLayout";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required().min(8, "Password must have 8 characters"),
  })
  .required();

const SignInPage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleSignIn = async (values) => {
    if (!isValid) return;
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("login successfully");
      navigate("/");
    } catch (e) {
      toast.error("Something went wrong");
      console.log(e);
    }
  };

  useEffect(() => {
    document.title = "Sign in";
  }, []);
  useEffect(() => {
    const errorMessage = Object.values(errors);
    toast.error(errorMessage[0]?.message);
  }, [errors]);

  return (
    <>
      <RegisterLayout>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <FormField>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              placeHolder="Enter your email address"
              control={control}
              name="email"
            ></Input>
          </FormField>
          <FormField>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeHolder="Enter your password"
              control={control}
              name="password"
              togglePassword
            ></Input>
          </FormField>
          <p className="mb-5 font-medium">
            If you have an account,{" "}
            <NavLink to="/sign-up" className="text-base text-primary">
              Sign up
            </NavLink>
          </p>
          <div className="flex justify-center">
            <Button type="submit" loading={isSubmitting}>
              Sign in
            </Button>
          </div>
        </form>
      </RegisterLayout>
    </>
  );
};

export default SignInPage;
