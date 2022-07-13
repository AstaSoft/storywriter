import React from "react";
import styles from "./MembersTable.module.scss";
import classnames from "classnames";
import ThreeDotsMenu from "./ThreeDotsMenu";

const MembersTable = ({ members, handleDetele }) => {
  return (
    <ul className={styles.table}>
      <li className={styles.tableTopLine}>
        <div className={styles.col}>User</div>
        <div className={styles.col}>Last seen on site</div>
        <div className={styles.col}>Status</div>
        <div className={classnames(styles.col, styles.actionHeader)}></div>
      </li>
      {members.map((item, index) => (
        <li className={styles.item} key={index}>
          <div className={styles.col}>
            <div
              className={styles.userAvatar}
              style={{ backgroundImage: `url(${item.avatar})` }}
            />
            <div>
              <span className={styles.userName}>{item.name}</span>
              <span className={styles.mail}>{item.mail}</span>
            </div>
          </div>
          <div className={styles.col}>{item.date}</div>
          <div className={styles.col}>{item.status}</div>
		      <ThreeDotsMenu handleDelete={handleDetele}/>
        </li>
      ))}
    </ul>
  );
};

export default MembersTable;
