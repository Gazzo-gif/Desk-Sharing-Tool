import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { CgDisplayFullwidth } from "react-icons/cg";
import { BsList } from "react-icons/bs";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { RiAdminFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SidebarComponent = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState({ active: "calendar" });
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const isAdmin = true; // Set to true/false based on user's admin status

  const handleClick = (name) => {
    switch (name) {
      case "collapse":
        setCollapsed(!collapsed);
        break;

      case "calendar":
        setTab({ active: "calendar" });
        navigate("/home", { replace: true });
        break;

      case "profile":
        setTab({ active: "profile" });
        navigate("/profile", { replace: true });
        break;

      case "admin":
        setTab({ active: "admin" });
        navigate("/admin", { replace: true }); // Navigate to admin panel
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
          <MenuItem
            active={tab?.active === "calendar" ? true : false}
            icon={<IoCalendarNumberOutline />}
            onClick={() => handleClick("calendar")}
          >
            {t("calendar")}
          </MenuItem>
          <SubMenu icon={<CgDisplayFullwidth />} label={t("bookings")}>
            <MenuItem>12/12/24</MenuItem>
            <MenuItem>13/12/24</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;
