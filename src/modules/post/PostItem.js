import React from "react";
import { defaultImg } from "utils/constants";

const PostItem = () => {
  return (
    <>
      <div className="relative rounded-lg">
        <img
          src={defaultImg}
          alt=""
          className="object-cover w-full h-full rounded-lg -z-10"
        />
        <div className="absolute z-10 text-white inset-2">
          <div className="flex items-center justify-between mb-5">
            <span className="p-2 rounded-lg bg-slate-300 text-primary">
              Entertainment
            </span>
            <div className="flex items-center gap-y-3">
              <p className="mr-4">4/9</p>
              <p>DarkMoon</p>
            </div>
          </div>
          <p className="mb-3 text-xl font-semibold">Make an appointment</p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consectetur, repudiandae.
          </p>
        </div>
      </div>
    </>
  );
};

export default PostItem;
