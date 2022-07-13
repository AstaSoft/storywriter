import React from "react";
import { withFormik } from "formik";
import { object, string, ref } from "yup";
import styles from "./ResetPasswordForm.module.scss";
import classnames from "classnames"
import Button from "../../components/Button/Button";
import { withRouter } from "react-router-dom";

import withUserInfo from "../../hoc/withUserInfo";
import PasswordInput from "../../components/PasswordInput/PasswordInput";

const ResetPasswordForm = ({
  values,
  errors,
  touched,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
  history,
  showResetInfo
}) => {
  return (
    <form className={styles.formBody} onSubmit={handleSubmit}>
      {!showResetInfo ? (
        <>
          <h3 className={classnames("header1", styles.header1)}>Reset Password</h3>
          <p className={styles.textInfo}>Enter your new password</p>
          <div className="fieldWrapper">
            <PasswordInput
              placeholder="Enter Your Password"
              name="password"
              label="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password && touched.password}
              errorMessage={errors.password && touched.password && errors.password}
            />
          </div>
          <div className="fieldWrapper">
            <PasswordInput
              placeholder="Enter Your Password"
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
            <Button text="Reset password" type="submit" disabled={isSubmitting} />
          </div>
        </>
      ): (
        <>
          <h3 className={classnames("header1", styles.header1)}>Reset Password Confirmation</h3>
          <p className={classnames(styles.textConfirm)}>Your password has been succesfully reset. 
            Yo can go log in to your account</p>
          <div className={classnames(styles.goToSignBtn)}>
            <Button text="Go to sign in page" type="button" onClick={()=>{history.push("/login")}} />
          </div>
        </>
      )}
    </form>
  );
};

const FormikApp = withFormik({
  mapPropsToValues() {
    return {
      password: "",
      confirmPassword: ""
    };
  },
  validationSchema: () =>
    object().shape({
      password: string()
        .min(6, "Password must consist of more than 5 symbols ")
        .required("Please enter your Password"),
      confirmPassword: string()
        .oneOf([ref("password"), null], "Passwords don't match")
        .required("Please enter your Password")
    }),
  handleSubmit(
    values,
    {
      setErrors,
      setSubmitting,
      props: { handleChange }
    }
  ) {
    setTimeout(() => {handleChange(true)}, 2000);
    setSubmitting(false);
  }
})(ResetPasswordForm);

export default withUserInfo(withRouter(FormikApp));
