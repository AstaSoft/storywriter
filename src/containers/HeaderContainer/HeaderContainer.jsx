import React from "react";
import styles from "./HeaderContainer.module.scss";
import { withRouter } from "react-router-dom";
import {load} from "../../helpers/localStorage";

import TopHeader from "../../components/Header/TopHeader";
import LeftHeader from "../../components/Header/LeftHeader";

const HeaderContainer = ({ history }) => {
  const isToken = load("token");
  // const {location:{pathname}} = history;
  return (
    <div>
      {!isToken ? (
        <div className={styles.topHeaderWrapper}>
          <TopHeader />
        </div>
      ) : (
        <div className={styles.leftHeaderWrapper}>
          <LeftHeader />
        </div>
      )}
    </div>
  );
};

export default withRouter(HeaderContainer);
