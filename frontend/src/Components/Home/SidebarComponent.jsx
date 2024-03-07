import React, { useState, useEffect  } from "react";
import { CgProfile } from "react-icons/cg";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { CgDisplayFullwidth } from "react-icons/cg";
import { BsList } from "react-icons/bs";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { RiAdminFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaLanguage } from "react-icons/fa";

const SidebarComponent = () => {
  const { t, i18n } = useTranslation();
  const [tab, setTab] = useState({ active: "calendar" });
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Ensure correct active state based on URL path
    const currentPath = location.pathname;
    if (currentPath === "/home") {
      setActiveTab("calendar");
    // } else if (currentPath === "/profile") {
    //   setActiveTab("profile");
    } else if (currentPath === "/admin") {
      setActiveTab("admin");
    }
  }, [location.pathname]);

  const setActiveTab = (tabName) => {
    localStorage.setItem("activeTab", tabName);
  };

  const handleClick = (name) => {
    switch (name) {
      case "collapse":
        setCollapsed(!collapsed);
        localStorage.setItem("sidebarCollapsed", !collapsed);
        break;

      case "calendar":
        setTab({ active: "calendar" });
        navigate("/home", { replace: true });
        break;

      // case "profile":
      //   setTab({ active: "profile" });
      //   navigate("/profile", { replace: true });
      //   break;

      case "admin":
        setTab({ active: "admin" });
        localStorage.setItem("activeTab", "admin");
        navigate("/admin", { replace: true });
        break;

      case "language":
        const currentLanguage = i18n.language;
        const newLanguage = currentLanguage === "en" ? "de" : "en";
        i18n.changeLanguage(newLanguage);
        break;

      default:
        break;
    }
  };

  return (
    <div className="sidebar">
      <Sidebar
        collapsed={collapsed}
        backgroundColor="#008444"
        width={collapsed ? "80px" : "200px"}
        style={{
          height: "100%",
          [`&.active`]: {
            backgroundColor: "#13395e",
            color: "#b6c8d9",
            overflow: "auto",
          },
        }}
      >
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              if (level === 0)
                return {
                  backgroundColor: active ? "#ffdd00" : undefined,
                };
            },
          }}
        >
          <MenuItem
            active={tab?.active === "collapse" ? true : false}
            icon={<BsList />}
            onClick={() => handleClick("collapse")}
          >
          </MenuItem>
          {/* <MenuItem
            active={tab?.active === "profile" ? true : false}
            icon={<CgProfile />}
            onClick={() => handleClick("profile")}
          >
            {t("profile")}
          </MenuItem> */}
          <MenuItem
            active={localStorage.getItem("activeTab") === "admin"}
            icon={<RiAdminFill />}
            onClick={() => handleClick("admin")}
          >
            {t("admin")}
          </MenuItem>
          <MenuItem
            active={localStorage.getItem("activeTab") === "calendar"}
            icon={<IoCalendarNumberOutline />}
            onClick={() => handleClick("calendar")}
          >
            {t("calendar")}
          </MenuItem>
          {/* <SubMenu icon={<CgDisplayFullwidth />} label={t("bookings")}>
            <MenuItem> 12/12/24 </MenuItem>
            <MenuItem> 13/12/24 </MenuItem>
          </SubMenu> */}
          <MenuItem
            icon={<FaLanguage />}
            onClick={() => handleClick("language")}
          >
            {i18n.language === "en" ? "Deutsch" : "English"}
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;