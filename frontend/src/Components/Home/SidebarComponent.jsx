<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React, { useState } from "react";
>>>>>>> 0f71ca4 (Overlaping Solved)
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
<<<<<<< HEAD
import { FaLanguage, FaLock, FaCog } from "react-icons/fa";
import SimpleModal from "./SimpleModal";
=======
>>>>>>> b270e92 (admin panal rooms and desks)
=======
import SimpleModal from "./SimpleModal"; // Ensure this is the correct path to your SimpleModal component
import { CiSettings } from "react-icons/ci";
>>>>>>> 0f71ca4 (Overlaping Solved)

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

<<<<<<< HEAD
=======
      case "settings":
        // If needed, implement logic for profile tab click
        break;
      case "goAnonymous":
        // Implement go anonymous functionality here
        console.log("Going Anonymous");
        break;
      case "changePassword":
        setIsChangePasswordModalOpen(true); // Open the change password modal
        break;
>>>>>>> 0f71ca4 (Overlaping Solved)
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
<<<<<<< HEAD
=======
          />
          <SubMenu
            active={tab?.active === "settings"}
            icon={<CiSettings />
          }
            label={t("Settings")}
>>>>>>> 0f71ca4 (Overlaping Solved)
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
<<<<<<< HEAD
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
=======
          
>>>>>>> 0f71ca4 (Overlaping Solved)
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
<<<<<<< HEAD
<<<<<<< HEAD
import { FaLock, FaCog, FaBookmark } from "react-icons/fa";
=======
import { FaLanguage, FaLock, FaCog, FaEye, FaEyeSlash } from "react-icons/fa"; // Added FaEye and FaEyeSlash
>>>>>>> 9150b06 (Visibility)
import SimpleModal from "./SimpleModal";
=======
import { FaLock, FaCog, FaBookmark, FaEye, FaEyeSlash } from "react-icons/fa";
import ChangePassword from "./ChangePassword";
>>>>>>> 98adf4e (visibility)
import LogoutConfirmationModal from "./LogoutConfirmationModal";
import { CiLogout } from "react-icons/ci";
import { MdGTranslate } from "react-icons/md";
import { toast } from 'react-toastify';

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const [isVisibilityOn, setIsVisibilityOn] = useState(true); // State to manage visibility toggle
=======
  const [user, setUser] = useState({});
  const [visibility, setVisibility] = useState();
=======
  const [visibility, setVisibility] = useState(localStorage.getItem("visibility"));
>>>>>>> fbe1284 (bookings localization)

  useEffect(() => {
    // Fetch user's name from the backend
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/users/get/${localStorage.getItem("userId")}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const userData = await response.json();
        setUser(userData);
        setVisibility(userData.visibility)
        console.log("User data:", userData);

      } catch (error) {
        console.error("Error fetching user's name:", error);
      }
    };
    
    fetchUserData();
  }, []);
>>>>>>> 98adf4e (visibility)

  useEffect(() => {
=======
  const [visibility, setVisibility] = useState();

  useEffect(() => {
>>>>>>> 2d92f0c (get user info)
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

      case "changePassword":
        setIsChangePasswordModalOpen(true);
        break;

      case "logout":
        setIsLogoutConfirmationOpen(true);
        break;

<<<<<<< HEAD
      case "toggleVisibility":
        setIsVisibilityOn((prevVisibility) => !prevVisibility); // Toggle visibility state
=======
      case "visibility":
        changeVisibility();
>>>>>>> 98adf4e (visibility)
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
<<<<<<< HEAD
    console.log({ prevPassword, newPassword }); // Replace this with actual logic to change the password
    setIsChangePasswordModalOpen(false); // Close the modal after submit
=======
    setIsChangePasswordModalOpen(false);
>>>>>>> a1dd232 (change password)
=======
    const newPasswordAgain = event.target.newPasswordAgain.value;

    if (newPassword !== newPasswordAgain) {
      alert("Passwords Do Not Match");
      return; // Prevent further execution
    }

    // If passwords match, you can proceed with your logic to change the password
    console.log({ prevPassword, newPassword });

    // Close the modal after submit
    setIsChangePasswordModalOpen(false);
>>>>>>> 1a932ff (new password again added)
  };
  
  const handleLogoutConfirmed = () => {
    localStorage.removeItem("userId"); // Clear the user's session
    navigate("/", { replace: true }); // Redirect to login page
  };

  const changeVisibility = async () => {
    try {
      const response = await fetch(`/users/visibility/${localStorage.getItem("userId")}`, {
        method: "PUT"
      });
      const data = await response.json();
      if (response.ok && data !== -1) {
        if (data === 1) {
          setVisibility("true");
          localStorage.setItem("visibility", "true");
          toast.success(t("visible"));
        } else {
          setVisibility("false");
          localStorage.setItem("visibility", "false");
          toast.success(t("anonymous"));
        }
      } else {
        toast.warning(t("failVisibility"));
      }
    } catch (error) {
        console.log("Error changing visibility");
    }  
  }

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
<<<<<<< HEAD
<<<<<<< HEAD
            {name ? `Hello, ${name}` : "Hello!"}
=======
            {localStorage.getItem("name") ? `Hello, ${localStorage.getItem("name")}` : "Hello!"}
>>>>>>> 2d92f0c (get user info)
=======
            {localStorage.getItem("name") ? `${t("hello")}, ${localStorage.getItem("name")}` : `${t("hello")}!`}
>>>>>>> a3ef087 (visibility localization)
          </MenuItem>
          {localStorage.getItem("admin") === "true" && (
            <MenuItem
              active={activeTab === "admin"}
              icon={<RiAdminFill />}
              onClick={() => handleClick("admin")}
            >
              {t("admin")}
            </MenuItem>
          )}
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
<<<<<<< HEAD
<<<<<<< HEAD
            <MenuItem icon={isVisibilityOn ? <FaEye /> : <FaEyeSlash />} onClick={() => handleClick("toggleVisibility")}>{isVisibilityOn ? t("Visible") : t("Anonymous")}</MenuItem>
=======
            <MenuItem icon={visibility ? <FaEye /> : <FaEyeSlash />} onClick={() => handleClick("visibility")}>{t("visibility")}</MenuItem>
>>>>>>> 98adf4e (visibility)
=======
            <MenuItem icon={visibility === "true" ? <FaEye /> : <FaEyeSlash />} onClick={() => handleClick("visibility")}>{t("visibility")}</MenuItem>
>>>>>>> fbe1284 (bookings localization)
            <MenuItem icon={<FaLock />} onClick={() => handleClick("changePassword")}>{t("password")}</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>

      {/* Change Password Modal */}
      <ChangePassword
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
