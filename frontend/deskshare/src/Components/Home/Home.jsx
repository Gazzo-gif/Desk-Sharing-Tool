import React, { useState } from "react";
import "./Home.css";
import { CgProfile } from "react-icons/cg";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { CgDisplayFullwidth } from "react-icons/cg";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { RiAdminFill } from "react-icons/ri";
import HomeCalendar from "./HomeCalendar";

export default function Home() {
  const [tab, setTab] = useState({ active: "calendar" });
  return (
    <div className="home-page">
      <div className="sidebar">
        <Sidebar
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
              button: {
                // the active class will be added automatically by react router
                // so we can use it to style the active menu item
                [`&.active`]: {
                  backgroundColor: "#13395e",
                  color: "#b6c8d9",
                },
              },
            }}
          >
            <MenuItem
              icon={<CgProfile />}
              onClick={() => setTab({ active: "profile" })}
            >
              {" "}
              Profile{" "}
            </MenuItem>
            {true ? (
              <MenuItem
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
              icon={<IoCalendarNumberOutline />}
              onClick={() => setTab({ active: "calendar" })}
            >
              {" "}
              Calendar{" "}
            </MenuItem>
            <SubMenu icon={<CgDisplayFullwidth />} label="Display Bookings">
              <MenuItem> 12/12/24 </MenuItem>
              <MenuItem> 12/12/24 </MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>
      </div>
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
        {tab.active === "profile" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            Profile
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
