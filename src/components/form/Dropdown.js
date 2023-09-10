import React, { useState } from "react";

const Dropdown = ({ data, setValue, label, setLabel }) => {
  const [isDropdownShow, setIsDropdownShow] = useState(false);

  const handleClickCategory = (item) => {
    setLabel(item.name);
    handleSubmitCategory(item);
  };
  const handleSubmitCategory = (item) => {
    setValue("category", {
      id: item.id,
      ...item,
    });
  };

  return (
    <>
      <div
        className="w-[500px] border rounded-lg border-slate-100 p-4 font-medium pr-10 relative select-none cursor-pointer"
        onClick={() => setIsDropdownShow(!isDropdownShow)}
      >
        {label}
        {isDropdownShow && (
          <div className="absolute left-0 w-full p-5 pb-0 border rounded-lg top-full bg-slate-300">
            {data?.length > 0 &&
              data.map((item) => (
                <div
                  className="mb-5 hover:text-primary"
                  onClick={() => handleClickCategory(item)}
                >
                  {item.name}
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
