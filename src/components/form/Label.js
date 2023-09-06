import React from "react";

const Label = ({ htmlFor, id, className, children, ...props }) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
        id={id}
        className={`font-semibold cursor-pointer ${className}`}
      >
        {children}
      </label>
    </>
  );
};

export default Label;
