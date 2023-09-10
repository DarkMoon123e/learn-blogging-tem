import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { toast } from "react-toastify";
import { v4 } from "uuid";
const storage = getStorage();

const ImageUpLoad = ({
  control,
  name,
  setValue,
  setProgressUploadImg,
  progressUploadImg,
  image,
  setImage,
  ...props
}) => {
  const handleSelectImage = (e) => {
    console.log("file: ImageUpLoad.js:17 ~ handleSelectImage ~ file:", "ok");
    const file = e.target.files[0];
    if (!file) return;
    handleUploadImage(file);
  };

  const handleUploadImage = (file) => {
    // Upload file to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + file.name + v4());
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressUploadImg(Number(progress));
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            return;
        }
      },
      (error) => {
        toast.error("Can't upload image");
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
          setValue("img", downloadURL);
          console.log(
            "file: ImageUpLoad.js:54 ~ getDownloadURL ~ downloadURL:",
            downloadURL
          );
        });
      }
    );
  };

  return (
    <label className="w-[500px] h-[250px] border rounded-lg border-slate-100 p-4 font-medium pr-10 relative cursor-pointer">
      <input
        type="file"
        className="absolute w-1 h-1 p-0 -m-1 overflow-hidden border-0 clip-rect-0 whitespace-nowrap"
        onChange={handleSelectImage}
        {...props}
      />
      {image ? (
        <div className="absolute inset-0 rounded-lg">
          <img
            src={image}
            alt=""
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg">
          <img
            srcSet="/img-upload.png"
            alt=""
            className="object-cover w-[100px]"
          />
          <p>Choose photo</p>
        </div>
      )}
      {!image && (
        <div
          className="absolute bottom-0 left-0 w-10 h-1 transition-all bg-green-400 image-upload-progress"
          style={{
            width: `${Math.ceil(progressUploadImg)}%`,
          }}
        ></div>
      )}
    </label>
  );
};

export default ImageUpLoad;
