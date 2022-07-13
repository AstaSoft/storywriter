import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./Input.module.scss";

import { ReactComponent as IconError } from "../../images/icons/error.svg";
import { ReactComponent as SearchIcon } from "../../images/icons/searchIcon.svg";



const Input = ({
  type,
  value,
  icon,
  name,
  className,
  placeholder,
  label,
  onChange,
  error,
  errorMessage,
  ...attrs
}) => {

  const isSearchClass = {
    [styles.iconInput]: type === "search"
  };

  return (
    <label htmlFor={name} className={styles.fieldInlineWrapper} {...attrs}>
      {
        label?(
          <span className={styles.fieldName}>{label}</span>
        ): null
      }
      <input
        placeholder={placeholder}
        name={name}
        id={name}
        type={type}
        className={classNames(styles.field, isSearchClass, className)}
        onChange={onChange}
        value={value || ""}
      />

      {
        type === "search"?(
          <div className={styles.searchIconWrap}>
            <SearchIcon className={styles.searchIcon}/>
          </div>
        ):(
          <div className={styles.warningContainer}>
            {error && errorMessage && (
              <div>
                <IconError className={styles.warningIcon} />
                <p className={"warningField"}>{errorMessage}</p>
              </div>
            )}
          </div>
        )
      }
      
    </label>
  );
};

Input.propPypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string,
  placeholder: PropTypes.string
};

Input.defaultProps = {
  type: "text",
  placeholder: ""
};

export default Input;
