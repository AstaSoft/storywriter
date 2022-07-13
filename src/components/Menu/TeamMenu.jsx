import React from "react";
import styles from "./UserMenu.module.scss";
import MenuItem from "../MenuItem/MenuItem";
import { paths } from "../../routes/paths";
import { ReactComponent as Members } from "../../images/icons/iconMembers.svg";
import { ReactComponent as Projects } from "../../images/icons/projects.svg";
import { ReactComponent as TeamSettings } from "../../images/icons/settings.svg";

const menuItems = [
  {
    icon: <Projects />,
    name: "Projects",
    path: paths.teamProjects
  },
  {
    icon: <Members />,
    name: "Members",
    path: paths.members
  },
  {
    icon: <TeamSettings />,
    name: "Team Settings",
    path: paths.teamSettings
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
