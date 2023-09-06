import React from "react";

const ManageTitle = ({ title, decs }) => {
  return (
    <>
      <div>
        <h2 className="mb-10 text-3xl font-semibold text-primary">{title}</h2>
        <p>{decs}</p>
      </div>
    </>
  );
};

export default ManageTitle;
