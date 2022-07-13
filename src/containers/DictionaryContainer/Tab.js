import React from "react";
import styles from "./DictionaryContainer.module.scss";
import classNames from "classnames";

const Tab = ({ label, tabIndex, isActive, handleTabClick, description }) => {
  return (
    <div
      className={classNames(
        styles.tabWrapper,
        isActive ? styles.activeTabWrapper : ""
      )}
      onClick={() => {
        handleTabClick(tabIndex);
      }}
    >
      <span className={styles.tabTitle}>{label}</span>

      {description ? (
        <span
          className={styles.tabDesc}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ) : (
        <span className={styles.tabDesc}>No desctiption yet.</span>
      )}
    </div>
  );
};

export default Tab;
