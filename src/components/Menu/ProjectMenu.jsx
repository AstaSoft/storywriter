import React from "react";
import styles from "./UserMenu.module.scss";
import MenuItem from "../MenuItem/MenuItem";
import { paths } from "../../routes/paths";
import { ReactComponent as ProjectSettings } from "../../images/icons/settings.svg";

const menuItems = [
  {
    icon: <ProjectSettings />,
    name: "Project Settings",
    path: paths.projectSettings
  }
];

const TeamMenu = () => {
  return (
    <div className={styles.userMenu}>
      <ul>
        {menuItems.map(item => (
          <MenuItem
            icon={item.icon}
            name={item.name}
            path={item.path}
            key={item.path}
          />
        ))}
      </ul>
    </div>
  );
};

export default TeamMenu;
