import { db } from "../firebase/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const useFetchDoc = (col) => {
  const [list, setList] = useState();
  useEffect(() => {
    const colRef = collection(db, col);
    onSnapshot(colRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setList(results);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { list };
};

export default useFetchDoc;
