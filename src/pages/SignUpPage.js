import Button from "components/Button";
import FormField from "components/form/FormField";
import Input from "components/form/Input";
import Label from "components/form/Label";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import RegisterLayout from "layouts/RegisterLayout";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { defaultImg, roleUser, statusUser } from "utils/constants";

const schema = yup
  .object({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(8, "Password must have 8 characters"),
  })
  .required();

const SignUpPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const handleSignUp = async (values) => {
    if (!isValid) return;
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      const colRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(colRef, {
        img: defaultImg,
        email: values.email,
        fullName: values.fullName,
        password: values.password,
        role: roleUser.USER,
        status: statusUser.PENDING,
        createdAt: serverTimestamp(),
      });
      await updateProfile(auth.currentUser, {
        displayName: values.fullName,
      });
      toast.success("created user successfully");
      navigate("/");
    } catch (e) {
      toast.error("This email address has already been");
    }
  };

  useEffect(() => {
    document.title = "Sign up";
  }, []);
  useEffect(() => {
    const errorMessage = Object.values(errors);
    toast.error(errorMessage[0]?.message);
  }, [errors]);

  return (
    <RegisterLayout>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <FormField>
          <Label htmlFor="fullName">FullName</Label>
          <Input
            name="fullName"
            control={control}
            id="fullName"
            placeHolder="Enter your full name"
          ></Input>
        </FormField>
        <FormField>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            placeHolder="Enter your email address"
            name="email"
            control={control}
          ></Input>
        </FormField>
        <FormField>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeHolder="Enter your password"
            name="password"
            type="password"
            control={control}
            togglePassword
          ></Input>
        </FormField>
        <p className="mb-5 font-medium">
          If you don't have an account,{" "}
          <NavLink to="/sign-in" className="text-base text-primary">
            Sign in
          </NavLink>
        </p>
        <div className="flex justify-center">
          <Button type="submit" loading={isSubmitting}>
            Sign up
          </Button>
        </div>
      </form>
    </RegisterLayout>
  );
};

export default SignUpPage;
