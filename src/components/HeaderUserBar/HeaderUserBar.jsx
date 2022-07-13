import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./HeaderUserBar.module.scss";
import { Link } from "react-router-dom";

import classNames from "classnames";
import withUserInfo from "../../hoc/withUserInfo";
import { paths } from "../../routes/paths";

const HeaderUserBar = ({ className, handleLogout, userInfo: { avatar } }) => {
  const userBarRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const handleClickOutside = useCallback(
    e => {
      if (userBarRef.current && !userBarRef.current.contains(e.target)) {
        setVisible(false);
      }
    },
    [setVisible]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className={classNames(styles.userBarWrap, className)}>
      <div
        onClick={() => setVisible(!visible)}
        className={styles.userBar}
        style={{
          background: avatar
            ? `url(${avatar}) center center / cover no-repeat rgb(224, 224, 224)`
            : null
        }}
      />
      <div
        className={styles.userBarMenu}
        ref={userBarRef}
        style={{ display: visible ? "block" : "none" }}
      >
        <span>
          <Link to={paths.profile}>Profile</Link>
        </span>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
};

export default withUserInfo(HeaderUserBar);
