import React from "react";
import { withFormik } from "formik";
import { object, string, ref } from "yup";
import styles from "./ChangePasswordForm.module.scss";
import classnames from "classnames"
import Button from "../../components/Button/Button";
import { withRouter } from "react-router-dom";

import withUserInfo from "../../hoc/withUserInfo";
import PasswordInput from "../../components/PasswordInput/PasswordInput";

const ChangePasswordForm = ({
  values,
  errors,
  touched,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  return (
    <form className={styles.formBody} onSubmit={handleSubmit}>
      <div className="fieldWrapper">
        <PasswordInput
          placeholder="Enter Your Password"
          name="currentPassword"
          label="Current Password"
          value={values.currentPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.currentPassword && touched.currentPassword}
          errorMessage={errors.currentPassword && touched.currentPassword && errors.currentPassword}
        />
      </div>
      <div className="fieldWrapper">
        <PasswordInput
          placeholder="Enter New Password"
          name="newPassword"
          label="New Password"
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.newPassword && touched.newPassword}
          errorMessage={errors.newPassword && touched.newPassword && errors.newPassword}
        />
      </div>
      <div className="fieldWrapper">
        <PasswordInput
          placeholder="Enter Your Email"
          name="confirmPassword"
          label="Confirm Password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.confirmPassword && touched.confirmPassword}
          errorMessage={errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
        />
      </div>

      <div className={classnames(styles.btnWraper)}>
        <Button text="Update password" type="submit" width="100%" height="40px" disabled={isSubmitting} />
      </div>
    </form>
  );
};

const FormikApp = withFormik({
  mapPropsToValues() {
    return {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    };
  },
  validationSchema: () =>
    object().shape({
      currentPassword: string()
        .min(6, "Password must consist of more than 5 symbols ")
        .required("Please enter your Password"),
      newPassword: string()
        .min(6, "Password must consist of more than 5 symbols ")
        .required("Please enter your Password"),
      confirmPassword: string()
        .oneOf([ref("newPassword"), null], "Passwords don't match")
        .required("Please enter your Password")
    }),
  handleSubmit(
    values,
    {
      setErrors,
      setSubmitting,
      props: { handleUpdate }
    }
  ) {
    handleUpdate()
    setSubmitting(false);
  }
})(ChangePasswordForm);

export default withUserInfo(withRouter(FormikApp));
