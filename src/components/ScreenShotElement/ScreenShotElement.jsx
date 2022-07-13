import React, { useState, useRef, useCallback, useEffect } from "react";
import styles from "./ScreenShotElement.module.scss";

const ScreenShotElement = ({ image, onDelete, onUpdate, deleteScreen }) => {
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef(null);
  const hoverBlockRef = useRef(null);

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
    <div className={styles.userPhotoWrap}>
      <div
        className={styles.hoverBlock}
        style={{ opacity: visible ? "1" : "0" }}
        onClick={() => {
          setVisible(!visible);
        }}
        ref={hoverBlockRef}
      />
      <img src={image} alt="User" />
      {visible && (
        <div
          className={styles.dropdown}
          ref={dropdownRef}
          style={{ display: visible ? "block" : "none" }}
        >
          <button onClick={onUpdate}>Open</button>
          <button onClick={deleteScreen}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ScreenShotElement;
