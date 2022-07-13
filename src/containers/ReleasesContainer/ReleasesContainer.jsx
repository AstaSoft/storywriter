import React from "react";
import styles from "../UserProfileContainer/UserProfileContainer.module.scss";
import withUserInfo from "../../hoc/withUserInfo";

const ReleasesContainer = () => {
  return <div className={styles.containerWrap}></div>;
};

export default withUserInfo(ReleasesContainer);
