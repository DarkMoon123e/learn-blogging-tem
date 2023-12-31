import Button from "components/Button";
import FormField from "components/form/FormField";
import ImageUpLoad from "components/form/ImageUpLoad";
import Input from "components/form/Input";
import Label from "components/form/Label";
import Radio from "components/form/Radio";
import RadioGroup from "components/form/RadioGroup";
import FormField2Row from "components/form/formField2Row";
import ManageTitle from "modules/manage/ManageTitle";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { categoryStatus } from "utils/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import useCapitalizeString from "hooks/useCapitalizeString";

const schema = yup
  .object({
    name: yup.string().required(),
    status: yup.string().required(),
    img: yup.string().required(),
  })
  .required();

const AddCategory = () => {
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

  const handleAddCategory = async (values) => {
    console.log(values);
    const colRef = collection(db, "categories");
    try {
      await addDoc(colRef, {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        name: useCapitalizeString(values.name),
        status: Number(values.status),
        img: values.img,
        createdAt: serverTimestamp(),
      });
      reset({
        name: "",
        status: 2,
        img: "",
      });
      setImage("");
      setProgressUploadImg(0);
      toast.success("Created category successfully");
    } catch (e) {
      toast.error("Something went wrong");
      console.log(e);
    }
  };

  useEffect(() => {
    const errorMessage = Object.values(errors);
    toast.error(errorMessage[0]?.message);
  }, [errors]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <ManageTitle title="Add post" decs="Create a new post"></ManageTitle>
      </div>
      <form onSubmit={handleSubmit(handleAddCategory)}>
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

export default AddCategory;
