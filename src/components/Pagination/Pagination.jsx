import React from "react";
import styles from "./Pagination.module.scss";
import classNames from "classnames";
import { ReactComponent as PrevIcon } from "../../images/icons/arrow-left.svg";
import { ReactComponent as NextIcon } from "../../images/icons/arrow-right.svg";

const Pagination = () => {
	return (
		<div className={styles.pagination}>
			<PrevIcon className={classNames(styles.control, styles.disabled)} />
			<div className={styles.box}>
				<span className={classNames(styles.item, styles.selected)}>1</span>
				<span className={styles.item}>2</span>
				<span className={styles.item}>3</span>
				<span className={styles.item}>4</span>
				<span className={styles.item}>5</span>
			</div>
			<NextIcon className={styles.control} />
		</div>
	);
};

export default Pagination;
