import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import style from "./PopupWrapper.module.scss";


const PopupWrapper = ({ className, title, subtitle, closeAction, children }) => (
  <div className={classNames(style.popupWrapper, className.outer)}>
    <div className={classNames(style.inner, className.inner)}>
      <div className={classNames(style.header, className.header)}>
        {title && <h3 className={classNames(style.title, className.title)}>{title}</h3>}
        {subtitle && <p className={classNames(style.subtitle, className.subtitle)}>{subtitle}</p>}
      </div>
      {children}
    </div>
  </div>
);

PopupWrapper.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.shape({
    outer: PropTypes.string,
    inner: PropTypes.string,
    header: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string
  }),
  closeAction: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

PopupWrapper.defaultProps = {
  className: {
    outer: "",
    inner: "",
    header: ""
  },
  title: ""
};

export default PopupWrapper;
