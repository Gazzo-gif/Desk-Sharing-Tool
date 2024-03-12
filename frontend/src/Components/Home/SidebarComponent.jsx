import React, { useState, useEffect } from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { CgDisplayFullwidth } from "react-icons/cg";
import { BsList, BsIncognito } from "react-icons/bs";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { RiAdminFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaLanguage, FaLock, FaCog } from "react-icons/fa";
import SimpleModal from "./SimpleModal";

const SidebarComponent = () => {
  const { t, i18n } = useTranslation();
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );
  const [activeTab, setActiveTab] = useState("calendar");
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = true;
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

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

      case "goAnonymous":
        console.log("Going Anonymous");
        break;

      case "changePassword":
        setIsChangePasswordModalOpen(true);
        break;

      default:
        break;
    }
  };

  const handleCloseModal = () => {
    setIsChangePasswordModalOpen(false);
  };

  const handleChangePasswordSubmit = (event) => {
    event.preventDefault();
    const prevPassword = event.target.prevPassword.value;
    const newPassword = event.target.newPassword.value;
    console.log({ prevPassword, newPassword }); // Replace this with actual logic to change the password
    setIsChangePasswordModalOpen(false); // Close the modal after submit
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
          <SubMenu icon={<FaCog />} label={t("settings")}>
            <MenuItem icon={<BsIncognito />} onClick={() => handleClick("goAnonymous")}>{t("visibility")}</MenuItem>
            <MenuItem icon={<FaLock />} onClick={() => handleClick("changePassword")}>{t("password")}</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>

      <SimpleModal
        isOpen={isChangePasswordModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleChangePasswordSubmit}
      />
    </div>
  );
};

export default SidebarComponent;
