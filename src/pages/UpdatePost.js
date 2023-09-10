import FormField from "components/form/FormField";
import Label from "components/form/Label";
import FormField2Row from "components/form/formField2Row";
import ManageTitle from "modules/manage/ManageTitle";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import useFetchDoc from "hooks/useFetchDoc";
import { toast } from "react-toastify";
import Dropdown from "components/form/Dropdown";
import InputToggle from "components/form/InputToggle";
import RadioGroup from "components/form/RadioGroup";
import Radio from "components/form/Radio";
import { postStatus } from "utils/constants";
import ImageUpLoad from "components/form/ImageUpLoad";
import Textarea from "components/form/Textarea";
import Button from "components/Button";
import Input from "components/form/Input";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { db } from "../firebase/firebase-config";
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

const UpdatePost = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const postId = params.get("postId");
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
  const { value, handleToggleValue } = useToggleValue();
  const [label, setLabel] = useState("Choose category ...");

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "posts", postId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
      setImage(singleDoc.data()?.img);

      setValue("category", {
        ...singleDoc.data().category,
      });
      setLabel(singleDoc.data()?.category.name);
    }
    fetchData();
  }, []);

  const handleUpdatePost = async (values) => {
    const docRef = doc(db, "posts", postId);
    try {
      await updateDoc(docRef, {
        tittle: values.tittle,
        img: values.img,
        category: values.category,
        hot: values.hot,
        status: Number(values.status),
        decs: values.decs,
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
      toast.success("Updated post successfully");
      navigate("/manage/post");
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
        <ManageTitle
          title="Update post"
          decs="Update information of post"
        ></ManageTitle>
      </div>
      <form onSubmit={handleSubmit(handleUpdatePost)}>
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
            Update post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
