import React, { useState } from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { BsList, BsIncognito } from "react-icons/bs";
import { TbPassword } from "react-icons/tb";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { RiAdminFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SimpleModal from "./SimpleModal"; // Ensure this is the correct path to your SimpleModal component
import { CiSettings } from "react-icons/ci";

const SidebarComponent = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState({ active: "calendar" });
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const isAdmin = true; // Set to true/false based on user's admin status
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  const handleClick = (name) => {
    switch (name) {
      case "collapse":
        setCollapsed(!collapsed);
        break;
      case "calendar":
        setTab({ active: "calendar" });
        navigate("/home", { replace: true });
        break;
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
      case "admin":
        setTab({ active: "admin" });
        navigate("/admin", { replace: true });
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
          height: "100%", // Ensure the sidebar takes up the full height
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
          />
          <SubMenu
            active={tab?.active === "settings"}
            icon={<CiSettings />
          }
            label={t("Settings")}
          >
            <MenuItem icon={<BsIncognito />} onClick={() => handleClick("goAnonymous")}>{t("Go anonymous")}</MenuItem>
            <MenuItem icon={<TbPassword />} onClick={() => handleClick("changePassword")}>{t("Change Password")}</MenuItem>
          </SubMenu>
          {isAdmin && (
            <MenuItem
              active={tab?.active === "admin" ? true : false}
              icon={<RiAdminFill />}
              onClick={() => handleClick("admin")}
            >
              {t("admin")}
            </MenuItem>
          )}
          <MenuItem
            active={tab?.active === "calendar" ? true : false}
            icon={<IoCalendarNumberOutline />}
            onClick={() => handleClick("calendar")}
          >
            {t("calendar")}
          </MenuItem>
          
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
