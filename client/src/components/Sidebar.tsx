import React, { useContext } from "react";
import homeIcon from "@/assets/icons/home.svg";
import addIcon from "@/assets/icons/add.svg";
import directIcon from "@/assets/icons/direct.svg";
import logoutIcon from "@/assets/icons/logout.svg";
import myphotoIcon from "@/assets/icons/myphotos.svg";
import settingsIcon from "@/assets/icons/settings.svg";
import notificationIcon from "@/assets/icons/notification.svg";
import profileIcon from "@/assets/icons/profile.svg";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import { userAuthContext } from "@/context/userAuth";

interface ISidebarProps {
  children: React.ReactNode;
}
const navItems = [
  { icon: homeIcon, name: "Home", link: "/" },
  { icon: addIcon, name: "Add Photos", link: "/post" },
  { icon: directIcon, name: "Direct", link: "#" },
  { icon: myphotoIcon, name: "My Photo", link: "/myphotos" },
  { icon: settingsIcon, name: "Settings", link: "/#" },
  { icon: notificationIcon, name: "Notification", link: "/#" },
  { icon: profileIcon, name: "Profile", link: "/profile" },
];
const Sidebar: React.FC<ISidebarProps> = () => {
  const { logout } = useContext(userAuthContext);
  const { pathname } = useLocation();
  const handleLogout = () => {
    console.log(`logout btn clicked in sidebar, loggingout...`);
    logout();
  };
  return (
    <nav className="flex flex-col relative h-screen max-w-sm w-full">
      <div className="flex justify-center m-5">
        <div className="text-white text-lg">PostBin</div>
      </div>
      {navItems.map((item) => (
        <div
          className={cn(
            buttonVariants({ variant: "default" }),
            pathname === item.link
              ? "bg-white text-white-800 hover:bg-white rounded-none"
              : "hover:bg-slate-950 hover:text-white bg-transparent rounded-none",
            "justify-start",
          )}
          key={item.name}
        >
          <Link to={item.link} className="flex">
            <span>
              <img
                src={item.icon}
                className="w-5 h-5 mr-2"
                alt={item.name}
                style={{
                  filter: `${
                    pathname === item.link ? "invert(0)" : "invert(1)"
                  }`,
                }}
              />
            </span>
            <span>{item.name}</span>
          </Link>
        </div>
      ))}
      <div
        className={cn(
          buttonVariants({ variant: "default" }),
          pathname === "/login"
            ? "bg-white text-white-800 hover:bg-white rounded-none"
            : "hover:bg-slate-950 hover:text-white bg-transparent rounded-none",
          "justify-start",
        )}
      >
        <Link to="/login" className="flex" onClick={handleLogout}>
          <span>
            <img
              src={logoutIcon}
              className="w-5 h-5 mr-2"
              alt="Logout"
              style={{
                filter: `${pathname === "/login" ? "invert(0)" : "invert(1)"}`,
              }}
            />
          </span>
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
};
export default Sidebar;
