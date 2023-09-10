import React from "react";

const FormField2Row = ({ children }) => {
  return (
    <div className="grid w-full grid-cols-2 mb-10 gap-x-5">{children}</div>
  );
};

export default FormField2Row;
