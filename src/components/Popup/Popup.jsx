import React, { useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ReactComponent as CrossIcon } from "../../images/icons/cross.svg";

import styles from "./Popup.module.scss";

const Popup = ({
  children,
  className,
  dialog,
  titleClassName,
  titleCentered,
  subtitleClassName,
  type,
  title,
  subtitle,
  text,
  textarea,
  button,
  acceptButton,
  width,
  height,
  titleStyle,
  textStyle,
  closeAction,
  isCrossIcon
}) => {
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
    if (dialog) return;

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dialog, handleClickOutside]);

  return (
    <div className={classNames(styles.popup, className)}>
      <div
        style={{ width: `${width}`, height: `${height}` }}
        ref={popupInnerRef}
        className={classNames(styles.inner, {
          [styles.smallPopup]: dialog
        })}
      >
        {isCrossIcon && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                closeAction();
              }}
            >
              <CrossIcon />
            </div>
          </div>
        )}
        {title && (
          <h2
            style={{
              textAlign: titleCentered ? "center" : null,
              ...titleStyle
            }}
            className={classNames(styles.title, "header1", titleClassName)}
          >
            {title}
          </h2>
        )}
        {subtitle && (
          <h4 className={classNames(styles.subtitle, subtitleClassName)}>
            {subtitle}
          </h4>
        )}
        {text && (
          <div
            style={textStyle}
            className={classNames(styles.text, {
              [styles.textSmallPopup]: dialog
            })}
          >
            {text}
          </div>
        )}
        {children && <div>{children}</div>}
        {textarea && <div>{textarea}</div>}
        {button && (
          <div
            className={classNames(styles.buttons, {
              [styles.dialogButtonsGroup]: dialog,
              [styles.buttonsGroup]: button && acceptButton
            })}
          >
            {acceptButton}
            {button}
          </div>
        )}
      </div>
    </div>
  );
};

Popup.propTypes = {
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
  isCrossIcon: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
  closeAction: PropTypes.func.isRequired
};

Popup.defaultProps = {
  className: "",
  title: "",
  subtitle: "",
  text: "",
  type: "default"
};

export default Popup;
