import React from "react";
import styles from "./DoubleColumnContainer.module.scss";

const DoubleColumnContainer = ({ leftColumn, rightColumn, lwidth, rwidth }) => {
  return (
    <div className={styles.wrapper}>
      <div
        style={{ width: lwidth ? `${lwidth}` : null }}
        className={styles.col}
      >
        {leftColumn}
      </div>
      <div
        style={{ width: rwidth ? `${rwidth}` : null }}
        className={styles.col}
      >
        {rightColumn}
      </div>
    </div>
  );
};

export default DoubleColumnContainer;
