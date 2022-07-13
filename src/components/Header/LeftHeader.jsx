import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import HeaderUserBar from "../HeaderUserBar/HeaderUserBar";
import withUserInfo from "../../hoc/withUserInfo";
import { ReactComponent as SearchIcon } from "../../images/icons/search.svg";
import { ReactComponent as AddIcon } from "../../images/icons/add.svg";

const Header = ({ userLogout }) => {
  return (
    <header className={styles.leftMainHeader}>
      <div className={styles.topWrap}>
        <Link to="/" className={styles.logo}>
          sw
        </Link>
        <SearchIcon className={styles.searchBtn} />
        <AddIcon className={styles.addBtn} />
      </div>
      <HeaderUserBar handleLogout={userLogout} />
    </header>
  );
};

export default withUserInfo(Header);
