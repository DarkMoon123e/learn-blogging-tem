import React from "react";
import { useController } from "react-hook-form";

const Radio = ({ children, name, control, checked, ...props }) => {
  const { field } = useController({
    name,
    control,
  });
  return (
    <label className="cursor-pointer">
      <input type="radio" className="hidden" {...field} {...props} />
      <div className="flex items-center gap-x-4">
        <div
          className={`w-8 h-8 rounded-full border ${
            checked ? "bg-primary" : ""
          }`}
        ></div>
        <span>{children}</span>
      </div>
    </label>
  );
};

export default Radio;
