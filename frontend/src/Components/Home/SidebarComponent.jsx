import React, { useState, useEffect } from "react";
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
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );
  const [activeTab, setActiveTab] = useState("calendar");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the current pathname from the location
    const path = location.pathname;
    // Determine the active tab based on the current pathname
    if (path.startsWith("/admin")) {
      setActiveTab("admin");
    } else if (path.startsWith("/mybookings")) {
      setActiveTab("bookings");
    } else {
      setActiveTab("calendar");
    }
  }, [location.pathname]);

  const handleClick = (name) => {
    switch (name) {
      case "collapse":
        setCollapsed(!collapsed);
        localStorage.setItem("sidebarCollapsed", !collapsed);
        break;

      case "calendar":
        setActiveTab("calendar");
        navigate("/home", { replace: true });
        break;

      case "admin":
        setActiveTab("admin");
        navigate("/admin", { replace: true });
        break;

      case "bookings":
        setActiveTab("bookings");
        navigate("/mybookings", { replace: true });
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
          height: "100vh",
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
            active={activeTab === "collapse"}
            icon={<BsList />}
            onClick={() => handleClick("collapse")}
          >
          </MenuItem>
          <MenuItem
            active={activeTab === "admin"}
            icon={<RiAdminFill />}
            onClick={() => handleClick("admin")}
          >
            {t("admin")}
          </MenuItem>
          <MenuItem
            active={activeTab === "calendar"}
            icon={<IoCalendarNumberOutline />}
            onClick={() => handleClick("calendar")}
          >
            {t("calendar")}
          </MenuItem>
          <MenuItem
            active={activeTab === "bookings"}
            icon={<CgDisplayFullwidth />}
            onClick={() => handleClick("bookings")}
          >
            {t("bookings")}
          </MenuItem>
          <MenuItem
            icon={<FaLanguage />}
            onClick={() => handleClick("language")}
          >
            {i18n.language === "en" ? "Deutsch" : "English"}
          </MenuItem>
        </Menu>
        <Menu>
          <SubMenu icon={<CgDisplayFullwidth />} label={t("settings")}>
            <MenuItem> {t("visibility")} </MenuItem>
            <MenuItem> {t("password")} </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;
