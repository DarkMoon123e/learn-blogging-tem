import React from "react";
import { useController } from "react-hook-form";

const InputToggle = ({ control, name, value, handleToggleValue }) => {
  console.log("file: InputToggle.js:5 ~ InputToggle ~ value:", value);
  const { field } = useController({
    control,
    name,
  });

  return (
    <label
      className={`relative w-[100px] h-[50px] rounded-3xl cursor-pointer transition-all ${
        value ? "bg-primary" : "bg-slate-500"
      }`}
    >
      <input
        type="checkbox"
        {...field}
        className="hidden"
        onClick={() => handleToggleValue()}
      />
      <div
        className={`absolute h-[44px] w-[44px] rounded-full bg-white z-10 top-2/4 -translate-y-2/4 ${
          value ? "right-1" : "left-1"
        }`}
      ></div>
    </label>
  );
};

export default InputToggle;
