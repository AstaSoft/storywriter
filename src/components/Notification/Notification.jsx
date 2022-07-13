import React, { useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ReactComponent as CrossIcon } from "../../images/icons/cross.svg";

import styles from "./Notification.module.scss";

const Notification = ({ id, className, type, title, text, closeAction }) => {
  // Click outside popup
  const popupInnerRef = useRef(null);

  const handleClickOutside = useCallback(
    e => {
      if (popupInnerRef.current && !popupInnerRef.current.contains(e.target)) {
        closeAction();
      }
    },
    [closeAction]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [type, handleClickOutside]);

  useEffect(()=>{
    const timeout = setTimeout(()=>{closeAction()}, 3000)
    return ()=>{clearTimeout(timeout)}
  }, [closeAction])

  const iconClass = {
    [styles.dangerIcon]: type === "fail",
    [styles.doneIcon]: type === "success"
  };

  return (
    <div id={id} className={classNames(styles.notificationWrap, className)}>
      <div className={classNames(styles.icon, iconClass)} />
      <div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{text}</p>
      </div>
      <div
        style={{ cursor: "pointer", position: "absolute", right: "7px" }}
        onClick={() => {
          closeAction();
        }}
      >
        <CrossIcon />
      </div>
    </div>
  );
};

Notification.propTypes = {
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  subtitleClassName: PropTypes.string,
  innerClassName: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  textarea: PropTypes.object,
  button: PropTypes.element,
  acceptButton: PropTypes.element,
  type: PropTypes.string,
  closeAction: PropTypes.func.isRequired
};

Notification.defaultProps = {
  className: "",
  title: "",
  subtitle: "",
  text: "",
  type: "default"
};

export default Notification;
