import React from "react";

const TittlePostList = ({ children }) => {
  return (
    <>
      <h2 className="mb-6 text-3xl font-semibold text-primary b-5">
        {children}
      </h2>
    </>
  );
};

export default TittlePostList;
