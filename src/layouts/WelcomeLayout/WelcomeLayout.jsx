import React from "react";
import styles from "./WelcomeLayout.module.scss";
import classNames from "classnames";

const WelcomeLayout = ({ children }) => {
	return (
		<div className={classNames(styles.mainWrap)}>
			{children}
		</div>
	);
};

export default WelcomeLayout;
