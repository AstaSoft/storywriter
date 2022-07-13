import React from "react";
// import styles from "./styles.module.scss";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import DashboardContainer from "../../containers/DashboardContainer/DashboardContainer";
import UserMenu from "../../components/Menu/UserMenu";

const DashboardPage = () => {
  return (
    <BasicLayout menuType={<UserMenu />}>
      <DashboardContainer />
    </BasicLayout>
  );
};

export default DashboardPage;
