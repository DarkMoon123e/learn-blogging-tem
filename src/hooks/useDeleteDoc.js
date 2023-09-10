import { db } from "../firebase/firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const useDeleteDoc = (docName, docId) => {
  const handleDeleteDoc = async () => {
    const docRef = doc(db, docName, docId);
    try {
      Swal.fire({
        title: `Yes, I want delete ${docName} ${docId}`,
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes`,
      }).then((result) => {
        if (result.isConfirmed) {
          deleteDoc(docRef);
          toast.success(`${docName} ${docId} deleted successfully`);
          Swal.fire(`${docName} ${docId} deleted successfully`);
        }
      });
    } catch (e) {
      toast.error("Something went wrong");
    }
  };
  return { handleDeleteDoc };
};

export default useDeleteDoc;
