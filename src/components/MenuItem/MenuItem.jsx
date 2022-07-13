import React from "react";
import styles from "./MenuItem.module.scss";
import { NavLink } from "react-router-dom";

const MenuItem = ({ icon, name, path }) => {
  return (
    <li className={styles.list}>
      <NavLink to={path} activeClassName={styles.active}>
        <span className={styles.icon}> {icon} </span>
        <span className={styles.itemName}>{name}</span>
      </NavLink>
    </li>
  );
};

export default MenuItem;
