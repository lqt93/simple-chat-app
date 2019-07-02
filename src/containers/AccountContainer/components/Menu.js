import React from "react";
import { Link } from "react-router-dom";
import List from "../../../components/common/List";

const menuList = [
  { name: "Profile", path: "/account?tab=profile" },
  { name: "Avatar", path: "/account?tab=avatar" },
  { name: "Security", path: "/account?tab=security" }
];

function Menu({ currentTab }) {
  return (
    <div className="settings-menu">
      <List list={menuList} ItemComponent={MenuItem} currentTab={currentTab} />
    </div>
  );
}

function MenuItem({ data, isFirst, isLast, currentTab, onClick }) {
  return (
    <li
      onClick={onClick}
      className={`settings-menu__item ${isLast && "settings-menu__item--last"}`}
    >
      <Link to={data.path}>
        <div
          className={`menu-item-container ${
            isLast
              ? "menu-item-container--last"
              : isFirst
              ? "menu-item-container--first"
              : ""
          } ${currentTab === data.name ? "menu-item-container--chosen" : ""}`}
        >
          {data.name}
        </div>
      </Link>
    </li>
  );
}

export default Menu;
