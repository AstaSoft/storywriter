import React from "react";
// import styles from "./ProjectSettingsPage.module.scss";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import ProjectSettingsContainer from "../../containers/ProjectSettingsContainer/ProjectSettingsContainer";
import ProjectMenu from "../../components/Menu/ProjectMenu";

const ProjectSettingsPage = () => {
  return (
    <BasicLayout
      menuType={<ProjectMenu />}
      contentHead={{ title: "Project Settings" }}
    >
      <ProjectSettingsContainer />
    </BasicLayout>
  );
};

export default ProjectSettingsPage;
