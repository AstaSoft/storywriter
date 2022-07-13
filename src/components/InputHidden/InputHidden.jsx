import React, { useState, useRef, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import style from "./InputHidden.module.scss";
import { ReactComponent as Cross } from "../../images/icons/cross.svg";
import { ReactComponent as Check } from "../../images/icons/check.svg";

const InputHidden = ({
  hiddenValue,
  value,
  type,
  name,
  className,
  disabled,
  label,
  error,
  errorMessage,
  icon,
  underline,
  small,
  onSave,
  onCancel,
  textStyle,
  inputStyle,
  ...attrs
}) => {
  const [isEdit, setIsEdit] = useState(typeof value === undefined);

  const inputRef = useRef(null);
  const saveButtonRef = useRef(null);
  const cancelButtonRef = useRef(null);

  const handleClickOutside = useCallback(
    e => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        saveButtonRef.current &&
        !saveButtonRef.current.contains(e.target) &&
        cancelButtonRef.current &&
        !cancelButtonRef.current.contains(e.target)
      ) {
        onCancel();
        setIsEdit(false);
      }
    },
    [onCancel]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const inputClassNames = classnames(style.input, {
    [style.bordered]: !underline,
    [style.borderedSmall]: !underline && small,
    [style.underline]: underline,
    [style.withIcon]: icon,
    [style.borderedError]: error & !underline,
    [style.underlineError]: error & underline,
    [style.withIconError]: error & (typeof icon !== "undefined")
  });
  return (
    <div className={classnames(style.wrapper, className)}>
      <div style={{ position: "relative" }}>
        {isEdit ? (
          <div style={{height: "75px"}}>
            <input
              ref={inputRef}
              type={type}
              name={name}
              disabled={disabled}
              value={value}
              className={inputClassNames}
              //   onBlur={() => setIsEdit(false)}
              autoFocus
              style={{...inputStyle}}
              {...attrs}
            />
            <div className={style.btnWrapper}>
              <button
                ref={saveButtonRef}
                onClick={() => {
                  onSave();
                  setIsEdit(false);
                }}
              >
                <Check />
              </button>
              <button
                ref={cancelButtonRef}
                onClick={() => {
                  onCancel();
                  setIsEdit(false);
                }}
              >
                <Cross />
              </button>
            </div>
          </div>
        ) : (
          <span
            className={style.hiddenInput}
            style={{ color: value ? "#000" : null, ...textStyle }}
            onClick={() => {
              setIsEdit(true);
            }}
          >
            {hiddenValue}
          </span>
        )}

        {icon && <div className={style.icon}>{icon}</div>}
        {errorMessage && (
          <span className={classnames("noteText", style.errorText)}>
            {errorMessage}
          </span>
        )}
      </div>
    </div>
  );
};

InputHidden.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  icon: PropTypes.element,
  underline: PropTypes.bool,
  small: PropTypes.bool,
  value: PropTypes.any,
  hiddenValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

InputHidden.defaultProps = {
  type: "text",
  className: "",
  disabled: false,
  error: false,
  errorMessage: "",
  underline: false,
  small: false,
  value: null,
  hiddenValue: "",
  onSave: () => {
    console.log("Default onSave funcion is called");
  },
  onCancel: () => {
    console.log("Default onCancel funcion is called");
  }
};

export default InputHidden;
