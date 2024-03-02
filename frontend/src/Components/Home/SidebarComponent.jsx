import React, { useState } from "react"
import { CgProfile } from "react-icons/cg";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { CgDisplayFullwidth } from "react-icons/cg";
import { BsList } from "react-icons/bs"; 
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { RiAdminFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const SidebarComponent = () =>{
  const [tab, setTab] = useState({ active: "calendar" });
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

    

  const handleClick = (name) => {
    switch (name) {
      case "collapse":
        setCollapsed(!collapsed)
        break;
        
      case "calendar":
        setTab({ active: "calendar" })
        navigate("/home", { replace: true })
        break;
        
      case "profile":
        setTab({ active: "profile" })
        navigate("/profile", { replace: true })
        break;

      case "admin":
        setTab({ active: "admin" })
        // navigate("/home", { replace: true })
        break;
    
      default:
        break;
    }
  };

return(
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
            // only apply styles on first level elements of the tree
            if (level === 0)
              return {
                // color: disabled ? "#f5d9ff" : "#d359ff",
                backgroundColor: active ? "#ffdd00" : undefined,
              };
          },
        }}
      >
        <MenuItem
          // Collapse button
          active={tab?.active === "collapse" ? true : false}
          icon={<BsList />}
          onClick={() => handleClick("collapse")}
        >
          {" "}
          Collapse{" "}
        </MenuItem>
        <MenuItem
          // Profile button
          active={tab?.active === "profile" ? true : false}
          icon={<CgProfile />}
          onClick={() => handleClick("profile")}
        >
          {" "}
          Profile{" "}
        </MenuItem>
        {true ? (
          <MenuItem
          // Admin panel
            active={tab?.active === "admin" ? true : false}
            icon={<RiAdminFill />}
            onClick={() => handleClick("admin")}
          >
            {" "}
            Admin
          </MenuItem>
        ) : (
          ""
        )}
        <MenuItem
        // Calendar button
          active={tab?.active === "calendar" ? true : false}
          icon={<IoCalendarNumberOutline />}
          onClick={() => handleClick("calendar")}
        >
          {" "}
          Calendar{" "}
        </MenuItem>
        <SubMenu icon={<CgDisplayFullwidth />} label="Bookings">
          <MenuItem> 12/12/24 </MenuItem>
          <MenuItem> 13/12/24 </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  </div>
)
}
export default SidebarComponent;