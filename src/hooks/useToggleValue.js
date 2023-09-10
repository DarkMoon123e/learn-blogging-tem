import { useState } from "react";

const useToggleValue = (initValue = false) => {
  const [value, setValue] = useState(initValue);
  const handleToggleValue = () => {
    // if (val) setValue(val);
    setValue(!value);
  };
  return { value, handleToggleValue, setValue };
};

export default useToggleValue;
