import React from "react";
import { NavLink } from "react-router-dom";

const Button = ({
  children,
  className,
  to = "",
  loading = false,
  ...props
}) => {
  if (to !== "") {
    return (
      <NavLink to={to} className="inline-block" loading={loading}>
        <ButtonItem className={className} {...props}>
          {children}
        </ButtonItem>
      </NavLink>
    );
  }
  return (
    <div>
      <ButtonItem className={className} {...props} loading={loading}>
        {children}
      </ButtonItem>
    </div>
  );
};

const Spinner = () => {
  return (
    <div className="w-5 h-5 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
  );
};

const ButtonItem = ({ children, className, loading, ...props }) => {
  return (
    <button
      className={`min-w-[200px] min-h-[50px] flex items-center justify-center px-6 py-3 text-base font-semibold text-white rounded-lg cursor-pointer bg-primary ${
        loading && "bg-opacity-30"
      } ${className}`}
      {...props}
      disabled={loading}
    >
      {loading ? <Spinner></Spinner> : <div>{children}</div>}
    </button>
  );
};

export default Button;
