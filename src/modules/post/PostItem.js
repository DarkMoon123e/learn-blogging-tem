import useChangeTime from "hooks/useChangeTime";
import React from "react";

const PostItem = ({ data }) => {
  const { date } = useChangeTime(data.createdAt);
  return (
    <>
      <div className="relative rounded-lg">
        <div className="relative h-[250px] w-[380px] rounded-lg overflow-hidden">
          <img
            src={data.img}
            alt=""
            className="object-cover w-full h-full rounded-lg -z-10"
          />
          <div className="absolute inset-0 w-full h-full bg-opacity-20 bg-slate-900"></div>
        </div>
        <div className="absolute z-10 text-white inset-2">
          <div className="flex items-center justify-between mb-5">
            <span className="p-2 font-semibold rounded-lg bg-amber-500 text-primary">
              {data?.category?.name}
            </span>
            <div className="flex items-center gap-y-3">
              <p className="mr-4">{date}</p>
              <p>{data?.author}</p>
            </div>
          </div>
          <p className="mb-3 text-xl font-semibold">{data.tittle}</p>
          <p className="italic">{data?.decs}</p>
        </div>
      </div>
    </>
  );
};

export default PostItem;
