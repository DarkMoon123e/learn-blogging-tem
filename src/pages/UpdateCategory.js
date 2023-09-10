import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ManageTitle from "modules/manage/ManageTitle";
import FormField2Row from "components/form/formField2Row";
import FormField from "components/form/FormField";
import Label from "components/form/Label";
import Input from "components/form/Input";
import RadioGroup from "components/form/RadioGroup";
import Radio from "components/form/Radio";
import { categoryStatus } from "utils/constants";
import ImageUpLoad from "components/form/ImageUpLoad";
import Button from "components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const schema = yup
  .object({
    name: yup.string().required(),
    status: yup.string().required(),
    img: yup.string().required(),
  })
  .required();

const UpdateCategory = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const categoryId = params.get("categoryId");
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
      name: "",
      status: 2,
      img: "",
    },
  });
  const statusWatch = watch("status");
  const [image, setImage] = useState();
  const [progressUploadImg, setProgressUploadImg] = useState(0);

  const handleUpdateCategory = async (values) => {
    console.log(values);
    const colRef = doc(db, "categories", categoryId);
    try {
      await updateDoc(colRef, {
        name: values.name,
        status: Number(values.status),
        img: values.img,
        createdAt: serverTimestamp(),
      });
      setImage("");
      setProgressUploadImg(0);
      toast.success("Created category successfully");
      navigate("/manage/category");
    } catch (e) {
      toast.error("Something went wrong");
      console.log(e);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "categories", categoryId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
      setImage(singleDoc.data()?.img);
    }
    fetchData();
  }, [categoryId, image, reset, setValue]);

  useEffect(() => {
    const errorMessage = Object.values(errors);
    toast.error(errorMessage[0]?.message);
  }, [errors]);
  return (
    <div>
      <div className="flex items-center justify-between">
        <ManageTitle
          title="Update category"
          decs="Update information of category"
        ></ManageTitle>
      </div>
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
        <FormField2Row>
          <FormField>
            <Label htmlFor="name">Name</Label>
            <Input
              name="name"
              control={control}
              id="name"
              placeHolder="Enter name"
            ></Input>
          </FormField>
          <FormField>
            <Label htmlFor="status">Status</Label>
            <RadioGroup>
              <Radio
                name="status"
                control={control}
                value={Number(categoryStatus.APPROVED)}
                checked={Number(statusWatch) === categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                value={Number(categoryStatus.UNAPPROVED)}
                checked={Number(statusWatch) === categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </RadioGroup>
          </FormField>
        </FormField2Row>
        <FormField2Row>
          <FormField>
            <Label htmlFor="img">Image</Label>
            <ImageUpLoad
              setValue={setValue}
              image={image}
              setImage={setImage}
              progressUploadImg={progressUploadImg}
              setProgressUploadImg={setProgressUploadImg}
            ></ImageUpLoad>
          </FormField>
        </FormField2Row>
        <div className="flex justify-center">
          <Button type="submit" loading={isSubmitting}>
            Add category
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCategory;
