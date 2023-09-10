import Button from "components/Button";
import { NavLink } from "react-router-dom";
import { useAuth } from "contexts/auth-context";

const Header = () => {
  const { userInfo } = useAuth();
  const userLastName = userInfo?.displayName?.split(" ").slice(-1)[0];

  return (
    <div className="container flex items-center gap-x-5">
      <div className="max-w-[50px]">
        <NavLink to="/">
          <img
            srcSet="/logo.png 2x"
            alt="Monkey blogging"
            className="w-full h-full"
          />
        </NavLink>
      </div>
      {/* <ul className="flex items-center gap-x-5">
        {linkList.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "text-primary font-bold" : "font-bold"
            }
          >
            {item.name}
          </NavLink>
        ))}
      </ul> */}
      <div className="flex justify-end flex-1"></div>
      {userLastName ? (
        <p>
          Welcome back,{" "}
          <NavLink to="/manage/post" className="font-semibold text-primary">
            {userLastName}
          </NavLink>
        </p>
      ) : (
        <Button to="/sign-in">Sign in</Button>
      )}
    </div>
  );
};

const linkList = [
  {
    id: 1,
    to: "/",
    name: "Home",
  },
  {
    id: 2,
    to: "/blog",
    name: "Blog",
  },
  {
    id: 3,
    to: "/contact",
    name: "Contact",
  },
];

export default Header;
