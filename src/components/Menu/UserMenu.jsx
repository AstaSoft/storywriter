import React from "react";
// import styles from "./UserMenu.module.scss";
import MenuItem from "../MenuItem/MenuItem";
import { paths } from "../../routes/paths";
import { ReactComponent as Profile } from "../../images/icons/profile.svg";
// import { ReactComponent as Members } from "../../images/icons/members.svg";
import { ReactComponent as Projects } from "../../images/icons/projects.svg";
import { ReactComponent as Teams } from "../../images/icons/teams.svg";
import { ReactComponent as Dictionary } from "../../images/icons/dictionaryIcon.svg";

const menuItems = [
  {
    icon: <Projects />,
    name: "Projects",
    path: paths.projects
  },
  {
    icon: <Teams />,
    name: "Teams",
    path: paths.teams
  },
  {
    icon: <Profile />,
    name: "Profile",
    path: paths.profile
  },
  {
    icon: <Dictionary />,
    name: "Dictionary",
    path: paths.dictionary
  }
];

const UserMenu = () => {
  return (
    <div>
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

export default UserMenu;
