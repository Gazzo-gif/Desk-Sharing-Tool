import React from "react";
import "./Home.css";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

export default function Home() {
  return (
    <div className="home-page">
      <div className="sidebar">
        <Sidebar>
          <Menu>
            <SubMenu label="Display Bookings">
              <MenuItem> 12/12/24 </MenuItem>
              <MenuItem> 12/12/24 </MenuItem>
            </SubMenu>
            <MenuItem> Profile </MenuItem>
            <MenuItem> Calendar </MenuItem>
          </Menu>
        </Sidebar>
        ;
      </div>
      <div className="home-content"></div>
    </div>
  );
}
