import React from "react";
import styles from "./DashboardContainer.module.scss";
import withUserInfo from "../../hoc/withUserInfo";


const DashboardContainer = () => {

  return (
    <div className={styles.containerWrap}>
      
    </div>
  );
};

export default withUserInfo(DashboardContainer);
