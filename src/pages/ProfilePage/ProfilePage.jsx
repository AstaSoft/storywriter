import React from "react";
// import styles from "./styles.module.scss";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import UserProfileContainer from "../../containers/UserProfileContainer/UserProfileContainer";
import UserMenu from "../../components/Menu/UserMenu";

const ProfilePage = () => {
  return (
    <BasicLayout menuType={<UserMenu />}>
      <UserProfileContainer />
    </BasicLayout>
  );
};

export default ProfilePage;
