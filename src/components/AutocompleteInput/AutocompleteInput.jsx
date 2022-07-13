import React, { useState } from "react";
import ReactTags from "react-tag-autocomplete";
import PropTypes from "prop-types";
import classnames from "classnames";

import style from "./AutocompleteInput.module.scss";

const AutocompleteInput = ({
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
  placeholder,
  value,
  suggestions,
  handleFocus,
  handleBlur,
  handleDelete,
  handleAddition,
  handleValidate,
  handleInputChange,
  ...attrs
}) => {
  const [focus, setFocus] = useState(false);

  const labelClassNames = classnames("text", {
    [style.darkLabel]: !underline,
    [style.primaryLabel]: underline,
    [style.primaryLabelFocus]: focus && underline,
    [style.disabled]: disabled,
    [style.error]: error !== false
  });

  const inputClassNames = classnames(style.input, {
    [style.bordered]: !underline,
    [style.borderedSmall]: !underline && small,
    [style.underline]: underline,
    [style.withIcon]: icon,
    [style.borderedError]: (error !== false) & !underline,
    [style.underlineError]: (error !== false) & underline,
    [style.withIconError]: (error !== false) & (typeof icon !== "undefined")
  });

  return (
    <div className={classnames(style.wrapper, className)}>
      {label && (
        <label className={labelClassNames} htmlFor={name}>
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <ReactTags
          autofocus={false}
          classNames={{
            root: inputClassNames,
            search: style.search,
            selected: style.searchSelected,
            selectedTag: style.selectedTag,
            searchInput: style.searchInput,
            suggestions: style.suggestions,
            suggestionActive: style.suggestionActive,
            selectedTagName: style.tagName
          }}
          tags={value}
          suggestions={suggestions}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleValidate={handleValidate}
          handleInputChange={handleInputChange}
          handleFocus={() => {
            handleFocus();
            setFocus(true);
          }}
          handleBlur={() => {
            handleBlur();
            setFocus(false);
          }}
          placeholder={placeholder}
          inputAttributes={{ ...attrs, name, disabled, autoComplete: "off" }}
        />
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

AutocompleteInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.bool
  ]),
  errorMessage: PropTypes.string,
  icon: PropTypes.element,
  underline: PropTypes.bool,
  small: PropTypes.bool,
  value: PropTypes.array,
  suggestions: PropTypes.array,
  handleFocus: PropTypes.func,
  handleBlur: PropTypes.func,
  handleDelete: PropTypes.func,
  handleAddition: PropTypes.func,
  handleValidate: PropTypes.func,
  handleInputChange: PropTypes.func
};

AutocompleteInput.defaultProps = {
  type: "text",
  className: "",
  placeholder: "",
  disabled: false,
  label: "",
  error: false,
  errorMessage: "",
  underline: false,
  small: false,
  value: [],
  suggestions: [],
  handleFocus: () => {},
  handleBlur: () => {},
  handleDelete: () => {},
  handleAddition: () => {},
  handleValidate: () => true,
  handleInputChange: () => {}
};

export default AutocompleteInput;
