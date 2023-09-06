import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import PostItem from "./PostItem";

const PostList = () => {
  return (
    <>
      <Swiper spaceBetween={50} slidesPerView={3}>
        <SwiperSlide>
          <PostItem></PostItem>
        </SwiperSlide>
        <SwiperSlide>
          <PostItem></PostItem>
        </SwiperSlide>
        <SwiperSlide>
          <PostItem></PostItem>
        </SwiperSlide>
        <SwiperSlide>
          <PostItem></PostItem>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default PostList;
