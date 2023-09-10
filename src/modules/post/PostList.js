import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import PostItem from "./PostItem";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { v4 } from "uuid";

const PostList = ({ type }) => {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    let q;
    switch (type) {
      case "hot":
        q = query(colRef, where("hot", "==", "true"));
        break;
      case "approved":
        q = query(colRef, where("status", "==", 1));
        break;
      default:
        return;
    }
    console.log(q);

    onSnapshot(q, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.categoryId,
          ...doc.data(),
        });
      });
      setPostList(results);
    });
  }, []);
  if (!postList) return;

  return (
    <>
      <Swiper spaceBetween={50} slidesPerView={3} key={v4()}>
        {postList.length > 0 &&
          postList.map((item) => (
            <SwiperSlide key={item.id}>
              <PostItem data={item}></PostItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default PostList;
