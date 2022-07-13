import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./MembersTable.module.scss";
import classnames from "classnames";

const ThreeDotsMenu = ({ handleDelete }) => {
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = useCallback(
    e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
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
    <>
      <div
        onClick={() => {
          setVisible(!visible);
        }}
        className={classnames(styles.col, styles.action)}
      />
      {visible && (
        <div ref={dropdownRef} className={styles.dropdown}>
          <button
            onClick={() => {
              handleDelete();
              setVisible(false);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default ThreeDotsMenu;
