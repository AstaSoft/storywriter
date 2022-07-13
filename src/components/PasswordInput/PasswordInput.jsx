import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import style from "./PasswordInput.module.scss";

const ShowPasswordButtonPath = [
  "M11 0.5C6 0.5 1.73 3.61 0 8C1.73 12.39 6 15.5 11 15.5C16 15.5 20.27 12.39 22 8C20.27 3.61 16 0.5 11 0.5ZM11 13C8.24 13 6 10.76 6 8C6 5.24 8.24 3 11 3C13.76 3 16 5.24 16 8C16 10.76 13.76 13 11 13ZM11 5C9.34 5 8 6.34 8 8C8 9.66 9.34 11 11 11C12.66 11 14 9.66 14 8C14 6.34 12.66 5 11 5Z",
  "M11 2.5C14.79 2.5 18.17 4.63 19.82 8C18.17 11.37 14.8 13.5 11 13.5C7.2 13.5 3.83 11.37 2.18 8C3.83 4.63 7.21 2.5 11 2.5ZM11 0.5C6 0.5 1.73 3.61 0 8C1.73 12.39 6 15.5 11 15.5C16 15.5 20.27 12.39 22 8C20.27 3.61 16 0.5 11 0.5ZM11 5.5C12.38 5.5 13.5 6.62 13.5 8C13.5 9.38 12.38 10.5 11 10.5C9.62 10.5 8.5 9.38 8.5 8C8.5 6.62 9.62 5.5 11 5.5ZM11 3.5C8.52 3.5 6.5 5.52 6.5 8C6.5 10.48 8.52 12.5 11 12.5C13.48 12.5 15.5 10.48 15.5 8C15.5 5.52 13.48 3.5 11 3.5Z"
];

const PasswordInput = ({ name, className, disabled, label, error, errorMessage, underline, small, ...attrs }) => {
  const [focus, setFocus] = useState(false);
  const [inputType, setInputType] = useState("password");

  const toogleInputType = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const labelClassNames = classnames("text", {
    [style.darkLabel]: !underline,
    [style.primaryLabel]: underline,
    [style.primaryLabelFocus]: focus && underline,
    [style.disabled]: disabled,
    [style.error]: error
  });

  const inputClassNames = classnames(style.input, {
    [style.bordered]: !underline,
    [style.borderedSmall]: !underline && small,
    [style.underline]: underline,
    [style.borderedError]: error & !underline,
    [style.underlineError]: error & underline
  });

  return (
    <div className={classnames(style.wrapper, className)}>
      {label && (
        <label className={classnames(style.label, labelClassNames)} htmlFor={name}>
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <input id={name} type={inputType} className={inputClassNames} name={name} disabled={disabled} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} {...attrs} />
        <button type="button" onClick={toogleInputType} className={style.showPasswordButton}>
          <svg width="15" height="10" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={ShowPasswordButtonPath[inputType === "password" ? 1 : 0]} />
          </svg>
        </button>
      </div>
      {errorMessage && <span className={classnames("noteText", style.errorText)}>{errorMessage}</span>}
    </div>
  );
};

PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.object,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  underline: PropTypes.bool,
  small: PropTypes.bool
};

PasswordInput.defaultProps = {
  className: {},
  disabled: false,
  label: "",
  error: false,
  errorMessage: "",
  underline: false,
  small: false
};

export default PasswordInput;
