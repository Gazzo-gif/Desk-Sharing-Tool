<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { CgDisplayFullwidth } from "react-icons/cg";
import { BsList, BsIncognito } from "react-icons/bs";
=======
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { CgDisplayFullwidth } from "react-icons/cg";
import { BsList } from "react-icons/bs";
>>>>>>> b270e92 (admin panal rooms and desks)
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { RiAdminFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
<<<<<<< HEAD
import { FaLanguage, FaLock, FaCog } from "react-icons/fa";
import SimpleModal from "./SimpleModal";
=======
>>>>>>> b270e92 (admin panal rooms and desks)

const SidebarComponent = () => {
  const { t, i18n } = useTranslation();
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );
  const [activeTab, setActiveTab] = useState("calendar");
  const location = useLocation();
  const navigate = useNavigate();
<<<<<<< HEAD
  const isAdmin = true;
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
=======
  const isAdmin = true; // Set to true/false based on user's admin status
>>>>>>> b270e92 (admin panal rooms and desks)

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

<<<<<<< HEAD
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

=======
      case "profile":
        setTab({ active: "profile" });
        navigate("/profile", { replace: true });
        break;

      case "admin":
        setTab({ active: "admin" });
        navigate("/admin", { replace: true }); // Navigate to admin panel
        break;

>>>>>>> b270e92 (admin panal rooms and desks)
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
<<<<<<< HEAD
          >
          </MenuItem>
=======
          />
          <MenuItem
            active={tab?.active === "profile" ? true : false}
            icon={<CgProfile />}
            onClick={() => handleClick("profile")}
          >
            {t("profile")}
          </MenuItem>
          {isAdmin && (
            <MenuItem
              active={tab?.active === "admin" ? true : false}
              icon={<RiAdminFill />}
              onClick={() => handleClick("admin")}
            >
              {t("admin")}
            </MenuItem>
          )}
>>>>>>> b270e92 (admin panal rooms and desks)
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
    </div>
  );
};

export default SidebarComponent;
=======
import React, { useState, useEffect } from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { BsList, BsIncognito } from "react-icons/bs";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { RiAdminFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaLock, FaCog, FaBookmark } from "react-icons/fa";
import SimpleModal from "./SimpleModal";
import LogoutConfirmationModal from "./LogoutConfirmationModal";
import { CiLogout } from "react-icons/ci";
import { MdGTranslate } from "react-icons/md";

const SidebarComponent = ({ name }) => {
  const { t, i18n } = useTranslation();
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );
  const [activeTab, setActiveTab] = useState("calendar");
  const location = useLocation();
  const navigate = useNavigate();
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isLogoutConfirmationOpen, setIsLogoutConfirmationOpen] = useState(false);

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

      case "logout":
        setIsLogoutConfirmationOpen(true);
        break;

      default:
        break;
    }
  };

  const handleCloseChangePasswordModal = () => {
    setIsChangePasswordModalOpen(false);
  };

  const handleCloseLogoutConfirmationModal = () => {
    setIsLogoutConfirmationOpen(false);
  };

  const handleChangePasswordSubmit = (event) => {
    event.preventDefault();
<<<<<<< HEAD
    const prevPassword = event.target.prevPassword.value;
    const newPassword = event.target.newPassword.value;
    console.log({ prevPassword, newPassword }); // Replace this with actual logic to change the password
    setIsChangePasswordModalOpen(false); // Close the modal after submit
=======
    setIsChangePasswordModalOpen(false);
>>>>>>> a1dd232 (change password)
  };
  
  const handleLogoutConfirmed = () => {
    localStorage.removeItem("userId"); // Clear the user's session
    navigate("/", { replace: true }); // Redirect to login page
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
            {name ? `Hello, ${name}` : "Hello!"}
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
            icon={<FaBookmark />}
            onClick={() => handleClick("bookings")}
          >
            {t("bookings")}
          </MenuItem>
          <MenuItem
            icon={<MdGTranslate />}
            onClick={() => handleClick("language")}
          >
            {i18n.language === "en" ? "Deutsch" : "English"}
          </MenuItem>
          <MenuItem // Logout button
            icon={<CiLogout />}
            onClick={() => handleClick("logout")}
          >
            {t("Logout")}
          </MenuItem>
        </Menu>
        <Menu>
          <SubMenu icon={<FaCog />} label={t("settings")}>
            <MenuItem icon={<BsIncognito />} onClick={() => handleClick("goAnonymous")}>{t("visibility")}</MenuItem>
            <MenuItem icon={<FaLock />} onClick={() => handleClick("changePassword")}>{t("password")}</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>

      {/* Change Password Modal */}
      <SimpleModal
        isOpen={isChangePasswordModalOpen}
        onClose={handleCloseChangePasswordModal}
        onSubmit={handleChangePasswordSubmit}
      />

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={isLogoutConfirmationOpen}
        onClose={handleCloseLogoutConfirmationModal}
        onConfirm={handleLogoutConfirmed}
      />
    </div>
  );
};

export default SidebarComponent;
>>>>>>> 0f3334f (logout and admin)
