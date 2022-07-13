import React from "react";
import styles from "./styles.module.scss";

const Header = () => {
	return (
		<header className={styles.topMainHeader}>
			<span className={styles.title}>StoryWriter</span>
		</header>
	);
};

export default Header;
