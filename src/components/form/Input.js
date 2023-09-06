import InputEyeIcon from "components/icons/InputEyeIcon";
import InputEyeSlashIcon from "components/icons/InputEyeSlashIcon";
import React, { useState } from "react";
import { useController } from "react-hook-form";

const Input = ({
  type = "text",
  id,
  control,
  name,
  togglePassword = false,
  ...props
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });

  const [isCanSeePassword, setIsCanSeePassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={!togglePassword ? type : isCanSeePassword ? "text" : "password"}
        id={id}
        className="w-[500px] border rounded-lg border-slate-100 p-4 font-medium pr-10"
        {...props}
        {...field}
      />
      {togglePassword && (
        <div
          className="absolute cursor-pointer right-3 top-2/4 -translate-y-2/4"
          onClick={() => setIsCanSeePassword((pre) => !pre)}
        >
          {!isCanSeePassword ? (
            <InputEyeIcon></InputEyeIcon>
          ) : (
            <InputEyeSlashIcon></InputEyeSlashIcon>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
