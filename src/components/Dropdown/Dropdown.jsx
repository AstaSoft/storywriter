import React, { useState, useRef, useEffect, createRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import style from "./Dropdown.module.scss";

const Dropdown = ({
    id,
    label,
    placeholder,
    className,
    disabled,
    value,
    options,
    onChange,
    error,
    errorMessage,
    ...attrs
}) => {
    const [selected, setSelected] = useState(typeof value === "string" ? { id: "default", value: placeholder } : value);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isOpen, setIsOpen] = useState(false);
    const isInitialMount = useRef(true);

    // Click outside dropdown
    const dropdownRef = useRef(null);

    const handleClickOutside = e => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(()=>{
      setSelected(value)
    },[value]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            // Your useEffect code here to be run on update
            onChange(selected);
        }
        // eslint-disable-next-line
    }, [selected]);

    // Handling options through the navigation buttons
    const refs = options.reduce((acc, value) => {
        acc[value.id] = createRef();
        return acc;
    }, {});

    const scrollListToSelectOption = id => {
        const list = dropdownRef.current.querySelector(`.${style.optionsWrapper}`);
        const option = refs[id];
        if (list.scrollHeight > list.clientHeight) {
            const scrollBottom = list.clientHeight + list.scrollTop;
            const elementBottom = option.current.offsetTop + option.current.offsetHeight;
            if (elementBottom > scrollBottom) {
                list.scrollTop = elementBottom - list.clientHeight;
            } else if (option.current.offsetTop < list.scrollTop) {
                list.scrollTop = option.current.offsetTop;
            }
        }
    };

    const handleKeyDown = e => {
        const space = 32;
        const up = 38;
        const down = 40;
        if (e.keyCode === space) {
            setIsOpen(true);
        } else if (e.keyCode === down) {
            if (selectedIndex === options.length - 1) {
                setSelected(options[0]);
                setSelectedIndex(0);
                scrollListToSelectOption(options[0].id);
            } else {
                setSelected(options[selectedIndex + 1]);
                setSelectedIndex(selectedIndex + 1);
                scrollListToSelectOption(options[selectedIndex + 1].id);
            }
        } else if (e.keyCode === up) {
            if (selectedIndex === -1 || selectedIndex === 0) {
                setSelected(options[options.length - 1]);
                setSelectedIndex(options.length - 1);
                scrollListToSelectOption(options[options.length - 1].id);
            } else {
                setSelected(options[selectedIndex - 1]);
                setSelectedIndex(selectedIndex - 1);
                scrollListToSelectOption(options[selectedIndex - 1].id);
            }
        }
    };

    return (
        <div className={classnames(style.wrapper, className)} disabled={disabled || options.length === 0}>
            {label && (
                <label className={classnames("text", style.label, { [style.error]: error })} htmlFor={id}>
                    {label}
                </label>
            )}
          <div
              id={id}
              tabIndex={disabled ? -1 : 0}
              role="listbox"
              ref={dropdownRef}
              className={classnames(style.dropdown, { [style.dropdownError]: error })}
              aria-expanded={isOpen ? "true" : "false"}
              onClick={() => setIsOpen(!isOpen)}
              onKeyDown={handleKeyDown}
              onKeyPress={({ key }) => {
                  if (key === "Enter") setIsOpen(false);
              }}
              {...attrs}
          >
            <div aria-hidden="true" className={style.button}>
                {!isOpen ? (
                    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.99992 3.58586L8.29282 0.292969L9.70703 1.70718L4.99992 6.41429L0.292818 1.70718L1.70703 0.292969L4.99992 3.58586Z" fill="#42526E"/>
                    </svg>
                ) : (
                    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.00008 3.41414L1.70718 6.70703L0.292969 5.29282L5.00008 0.585711L9.70718 5.29282L8.29297 6.70703L5.00008 3.41414Z" fill="#42526E"/>
                    </svg>
                )}
            </div>
            <div className={style.optionDefault} role="alert" aria-live="polite" aria-atomic="true">
                {value.value ? value.value : selected.value ? selected.value : placeholder}
            </div>
            <div
                // Items length * item height + padding
                style={{ height: `${options.length * 40 + 16}px` }}
                className={classnames(style.options, { [style.optionsVisible]: isOpen })}
            >
              <div className={style.optionsWrapper}>
                  {options.map((option, index) => (
                      <div
                          role="option"
                          key={option.id}
                          ref={refs[option.id]}
                          style={{ pointerEvents: "all" }}
                          aria-checked={selected.id === option.id ? "true" : "false"}
                          aria-selected={selected.id === option.id ? "true" : "false"}
                          className={classnames(style.option, {
                              [style.optionSelected]: selected.id === option.id
                          })}
                          onClick={e => {
                              e.stopPropagation();
                              setIsOpen(false);
                              setSelected(option);
                              setSelectedIndex(index);
                          }}
                      >
                          {option.value}
                      </div>
                  ))}
              </div>
            </div>
          </div>
            {errorMessage && <span className={classnames("noteText", style.errorText)}>{errorMessage}</span>}
        </div>
    );
};

Dropdown.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            value: PropTypes.string
        })
    ),
    value: PropTypes.shape({
            id: PropTypes.string,
            value: PropTypes.string
        }),
    onChange: PropTypes.func,
    error: PropTypes.bool,
    errorMessage: PropTypes.string
};

Dropdown.defaultProps = {
    label: "",
    className: "",
    placeholder: "Select item",
    disabled: false,
    options: [],
    value: "",
    onChange: () => {},
    error: false,
    errorMessage: ""
};

export default Dropdown;