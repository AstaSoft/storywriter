import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./DotsMenuBar.module.scss";
import classNames from "classnames";

import { ReactComponent as DotsIcon } from "../../images/icons/dotsIcon.svg";

const DotsMenuBar = ({ className, deleteItem, index, direction }) => {
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

  const menuClass = {
    [styles.rightMenu]: direction !== "left",
    [styles.leftMenu]: direction === "left"
  };

  return (
    <div className={classNames(styles.menuBarContainer, className)}>
      <div className={classNames(styles.menuBarWrap)}>
        <div onClick={() => setVisible(!visible)} className={styles.menuBar}>
          <DotsIcon />
        </div>
        <div
          className={classNames(styles.barMenu, menuClass)}
          ref={userBarRef}
          style={{ display: visible ? "block" : "none" }}
        >
          <button
            onClick={() => {
              deleteItem(index);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DotsMenuBar;
