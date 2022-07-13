import React from "react";
// import styles from "./styles.module.scss";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import ReleasesContainer from "../../containers/ReleasesContainer/ReleasesContainer";
import UserMenu from "../../components/Menu/UserMenu";

const ReleasesPage = () => {
  return (
    <BasicLayout menuType={<UserMenu />}>
      <ReleasesContainer />
    </BasicLayout>
  );
};

export default ReleasesPage;
