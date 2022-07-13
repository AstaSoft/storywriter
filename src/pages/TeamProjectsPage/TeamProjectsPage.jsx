import React from "react";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import TeamProjectsContainer from "../../containers/TeamProjectsContainer/TeamProjectsContainer";
import TeamMenu from "../../components/Menu/TeamMenu";

const TeamProjectsPage = () => {
  return (
    <BasicLayout
      menuType={<TeamMenu />}
      contentHead={{
        title: "Team Projects",
        button: "Add Project",
        action: "createProject"
      }}
    >
      <TeamProjectsContainer />
    </BasicLayout>
  );
};

export default TeamProjectsPage;
