import React from "react";
// import styles from "./styles.module.scss";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import TeamsContainer from "../../containers/TeamsContainer/TeamsContainer";
import UserMenu from "../../components/Menu/UserMenu";

const TeamsPage = () => {
  return (
    <BasicLayout 
      menuType={<UserMenu />} 
      contentHead={{title: "Teams", button: "Add Team", action: "addTeam"}}
    >
      <TeamsContainer />
    </BasicLayout>
  );
};

export default TeamsPage;
