import React from "react";
import styles from "./EditableField.module.scss";
import InputHidden from "../../components/InputHidden/InputHidden";

const EditableField = ({label, ...attrs}) => {
  return (
    <div className={styles.editableFieldWrap}>
      <span className={styles.editableFieldLabel}>{label}</span>
      <InputHidden {...attrs}/>
    </div>
  );
};

export default EditableField;
