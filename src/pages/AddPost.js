import Button from "components/Button";
import Dropdown from "components/form/Dropdown";
import FormField from "components/form/FormField";
import ImageUpLoad from "components/form/ImageUpLoad";
import Input from "components/form/Input";
import InputToggle from "components/form/InputToggle";
import Label from "components/form/Label";
import Radio from "components/form/Radio";
import RadioGroup from "components/form/RadioGroup";
import FormField2Row from "components/form/formField2Row";
import ManageTitle from "modules/manage/ManageTitle";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { postStatus } from "utils/constants";
import useFetchDoc from "hooks/useFetchDoc";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { useAuth } from "contexts/auth-context";
import Textarea from "components/form/Textarea";
import useToggleValue from "hooks/useToggleValue";

const schema = yup
  .object({
    tittle: yup.string().required(),
    category: yup.object().required(),
    hot: yup.string().required(),
    status: yup.string().required(),
    img: yup.string().required(),
    decs: yup.string().required(),
  })
  .required();

const AddPost = () => {
  const { userInfo } = useAuth();
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
      tittle: "",
      status: 2,
      category: "",
      hot: false,
      img: "",
      decs: "",
    },
  });
  const statusWatch = watch("status");
  const [image, setImage] = useState();
  const [progressUploadImg, setProgressUploadImg] = useState(0);
  const { value, handleToggleValue } = useToggleValue(false);
  const [label, setLabel] = useState("Choose category ...");

  const handleAddPost = async (values) => {
    console.log(values);
    const colRef = collection(db, "posts");
    try {
      await addDoc(colRef, {
        author: userInfo.displayName,
        tittle: values.tittle,
        img: values.img,
        category: values.category,
        hot: Boolean(values.hot),
        status: Number(values.status),
        decs: values.decs,
        userId: userInfo.uid,
        createdAt: serverTimestamp(),
      });
      reset({
        tittle: "",
        status: 2,
        category: "",
        hot: false,
        img: "",
        decs: "",
      });
      setImage("");
      setProgressUploadImg(0);
      toast.success("Created post successfully");
    } catch (e) {
      toast.error("Something went wrong");
      console.log(e);
    }
  };

  const { list: categoryList } = useFetchDoc("categories");

  useEffect(() => {
    const errorMessage = Object.values(errors);
    toast.error(errorMessage[0]?.message);
  }, [errors]);

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <ManageTitle title="Add post" decs="Create a new post"></ManageTitle>
      </div>
      <form onSubmit={handleSubmit(handleAddPost)}>
        <FormField2Row>
          <FormField>
            <Label htmlFor="tittle">Tittle</Label>
            <Input
              name="tittle"
              control={control}
              id="tittle"
              placeHolder="Enter Tittle"
            ></Input>
          </FormField>
          <FormField>
            <Label>Category</Label>
            <Dropdown
              data={categoryList}
              control={control}
              name="category"
              setValue={setValue}
              label={label}
              setLabel={setLabel}
            ></Dropdown>
          </FormField>
        </FormField2Row>
        <FormField2Row>
          <FormField>
            <Label>Hot</Label>
            <InputToggle
              control={control}
              name="hot"
              value={value}
              handleToggleValue={handleToggleValue}
            ></InputToggle>
          </FormField>
          <FormField>
            <Label>Status</Label>
            <RadioGroup>
              <Radio
                name="status"
                control={control}
                value={Number(postStatus.APPROVED)}
                checked={Number(statusWatch) === postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                value={Number(postStatus.PENDING)}
                checked={Number(statusWatch) === postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                value={Number(postStatus.REJECT)}
                checked={Number(statusWatch) === postStatus.REJECT}
              >
                Reject
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
            <Label htmlFor="decs">Description</Label>
            <Textarea
              name="decs"
              control={control}
              id="decs"
              placeHolder="Enter decs"
            ></Textarea>
          </FormField>
        </FormField2Row>
        <div className="flex justify-center">
          <Button type="submit" loading={isSubmitting}>
            Add post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
