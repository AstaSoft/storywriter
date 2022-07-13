import React from "react";
import styles from "./AddComment.module.scss";
import withUserInfo from "../../hoc/withUserInfo";

const AddComment = ({ userInfo, userInfo: { avatar, firstName } }) => {
  console.log(userInfo);
  return (
    <div className={styles.addCommentContainer}>
      <div className={styles.avatarWrapper}>
        <img src={avatar} alt={`${firstName}`} />
      </div>
      <div className={styles.commentWrapper}>
        <textarea placeholder="Write a comment..."></textarea>
      </div>
    </div>
  );
};

export default withUserInfo(AddComment);
