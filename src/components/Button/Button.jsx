import React from "react";
import styles from "./Button.module.scss";
import PropTypes from "prop-types";
import classNames from "classnames";

const Button = ({
  text,
  className,
  width,
  height,
  attrs,
  onClick,
  disabled,
  style,
  buttonStyle,
  ...attr
}) => {
  const classes = classNames(styles.button, className, {
    [styles.btnDisabled]: disabled,
    [styles.btnPrimary]: buttonStyle === "primary",
    [styles.btnSecondary]: buttonStyle === "secondary",
    [styles.btnDanger]: buttonStyle === "danger",
    [styles.btnRed]: buttonStyle === "red"
  });

  const onClickAction = e => {
    if (disabled) {
      e.preventDefault();
    } else {
      return onClick(e);
    }
  };
  return (
    <button
      style={{ width: `${width}`, height: `${height}`, ...style }}
      className={classes}
      onClick={onClickAction}
      {...attr}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string
};

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
  className: "",
  text: "",
  width: "100%",
  height: "40px",
  buttonStyle: "primary"
};

export default Button;
