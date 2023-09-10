import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { db } from "../firebase/firebase-config";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormField2Row from "components/form/formField2Row";
import FormField from "components/form/FormField";
import Label from "components/form/Label";
import ImageUpLoad from "components/form/ImageUpLoad";
import Button from "components/Button";
import Input from "components/form/Input";
import Radio from "components/form/Radio";
import { roleUser, statusUser } from "utils/constants";
import RadioGroup from "components/form/RadioGroup";
import ManageTitle from "modules/manage/ManageTitle";
import { useNavigate, useSearchParams } from "react-router-dom";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";

const schema = yup
  .object({
    email: yup.string().required(),
    fullName: yup.string().required(),
    status: yup.string().required(),
    role: yup.string().required(),
    img: yup.string().required(),
    password: yup
      .string()
      .required()
      .min(8, "Password must be at least 8 characters"),
  })
  .required();

const UpdateUser = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const userId = params.get("userId");
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      img: "",
      fullName: "",
      password: "",
      role: 3,
      status: 2,
    },
  });
  const statusWatch = watch("status");
  const roleWatch = watch("role");
  const [image, setImage] = useState();
  const [progressUploadImg, setProgressUploadImg] = useState(0);

  const handleUpdateUser = async (values) => {
    console.log(values);
    const colRef = doc(db, "users", userId);
    try {
      await updateDoc(colRef, {
        email: values.email,
        fullName: values.fullName,
        img: values.img,
        password: values.password,
        role: Number(values.role),
        status: Number(values.status),
        createdAt: serverTimestamp(),
      });
      reset({
        email: "",
        img: "",
        fullName: "",
        password: "",
        role: 3,
        status: 2,
      });
      setImage("");
      setProgressUploadImg(0);
      toast.success("Created user successfully");
      navigate("/manage/user");
    } catch (e) {
      toast.error("Something went wrong");
      console.log(e);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "users", userId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
      setImage(singleDoc.data()?.img);
    }
    fetchData();
  }, [image, reset, setValue, userId]);

  useEffect(() => {
    const errorMessage = Object.values(errors);
    toast.error(errorMessage[0]?.message);
  }, [errors]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <ManageTitle
          title="Update user"
          decs="Update information of user"
        ></ManageTitle>
      </div>
      <div className="mb-10"></div>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <FormField2Row>
          <FormField>
            <Label htmlFor="email">Email address</Label>
            <Input
              name="email"
              control={control}
              id="email"
              placeHolder="Enter email"
            ></Input>
          </FormField>
          <FormField>
            <Label htmlFor="fullName">FullName</Label>
            <Input
              name="fullName"
              control={control}
              id="fullName"
              placeHolder="Enter fullName"
            ></Input>
          </FormField>
        </FormField2Row>
        <FormField2Row>
          <FormField>
            <Label>Status</Label>
            <RadioGroup>
              <Radio
                name="status"
                control={control}
                value={Number(statusUser.ACTIVE)}
                checked={Number(statusWatch) === statusUser.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                value={Number(statusUser.PENDING)}
                checked={Number(statusWatch) === statusUser.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                value={Number(statusUser.BAN)}
                checked={Number(statusWatch) === statusUser.BAN}
              >
                Ban
              </Radio>
            </RadioGroup>
          </FormField>
          <FormField>
            <Label>Role</Label>
            <RadioGroup>
              <Radio
                name="role"
                control={control}
                value={Number(roleUser.ADMIN)}
                checked={Number(roleWatch) === roleUser.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                value={Number(roleUser.MOD)}
                checked={Number(roleWatch) === roleUser.MOD}
              >
                Mod
              </Radio>
              <Radio
                name="role"
                control={control}
                value={Number(roleUser.USER)}
                checked={Number(roleWatch) === roleUser.USER}
              >
                User
              </Radio>
            </RadioGroup>
          </FormField>
        </FormField2Row>
        <FormField2Row>
          <FormField>
            <Label htmlFor="img">Image</Label>
            <ImageUpLoad
              setValue={setValue}
              progressUploadImg={progressUploadImg}
              setProgressUploadImg={setProgressUploadImg}
              image={image}
              setImage={setImage}
            ></ImageUpLoad>
          </FormField>
          <FormField>
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              control={control}
              id="password"
              placeHolder="Enter password"
              togglePassword
            ></Input>
          </FormField>
        </FormField2Row>
        <div className="flex justify-center">
          <Button type="submit" loading={isSubmitting}>
            Update user
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
