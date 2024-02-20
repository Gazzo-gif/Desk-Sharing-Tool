import React, { useState } from "react";
import "./Home.css";
import { CgProfile } from "react-icons/cg";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { CgDisplayFullwidth } from "react-icons/cg";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { RiAdminFill } from "react-icons/ri";
import HomeCalendar from "./HomeCalendar";
import Profile from "../Profile/Profile";
import Test from "./Test";
import Example from "./Example";

export default function Home() {
  const [tab, setTab] = useState({ active: "calendar" });
  const [collapsed, setCollapsed] = useState(false);
  // const notifications = 3;
  return (
    <div className="home-page">
      <div className="sidebar">
        <Sidebar
          collapsed={collapsed}
          backgroundColor="#008444"
          style={{
            height: "100%",
            [`&.active`]: {
              backgroundColor: "#13395e",
              color: "#b6c8d9",
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
              active={tab?.active === "profile" ? true : false}
              icon={<CgProfile />}
              onClick={() => setTab({ active: "profile" })}
            >
              {" "}
              Profile{" "}
            </MenuItem>
            {true ? (
              <MenuItem
                active={tab?.active === "admin-panel" ? true : false}
                icon={<RiAdminFill />}
                onClick={() => setTab({ active: "admin-panel" })}
              >
                {" "}
                Admin Panel
              </MenuItem>
            ) : (
              ""
            )}
            <MenuItem
              // suffix={notifications}
              active={tab?.active === "calendar" ? true : false}
              icon={<IoCalendarNumberOutline />}
              onClick={() => setTab({ active: "calendar" })}
            >
              {" "}
              Calendar{" "}
            </MenuItem>
            <SubMenu icon={<CgDisplayFullwidth />} label="Display Bookings">
              <MenuItem> 12/12/24 </MenuItem>
              <MenuItem> 13/12/24 </MenuItem>
            </SubMenu>
            <div>
              <button
                className="collapse-button"
                onClick={() => setCollapsed(!collapsed)}
              >
                Collapse
              </button>
            </div>
          </Menu>
        </Sidebar>
      </div>{" "}
      {/*  <Test />:<HomeCalendar /> */}
      <div className="home-content">
        {tab.active === "calendar" ? <HomeCalendar /> : ""}
        {tab.active === "admin-panel" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            Admin Panel
          </div>
        ) : (
          ""
        )}
        {tab.active === "display-bookings" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            Display Bookings
          </div>
        ) : (
          ""
        )}
        {tab.active === "profile" ? <Profile></Profile> : ""}
      </div>
    </div>
  );
}
