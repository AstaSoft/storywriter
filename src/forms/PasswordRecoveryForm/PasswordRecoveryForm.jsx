import React from "react";
import classnames from "classnames";
import { withFormik } from "formik";
import { object, string } from "yup";
import styles from "./PasswordRecoveryForm.module.scss";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { withRouter, Link } from "react-router-dom";
import { paths } from "../../routes/paths";

import { userInfo } from "../../helpers/testData";
import withUserInfo from "../../hoc/withUserInfo";

const PasswordRecoveryForm = ({
  values,
  errors,
  touched,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
  showRecoveryInfo
}) => {
  return (
    <form className={styles.formBody} onSubmit={handleSubmit}>
      {!showRecoveryInfo ? (
        <>
          <h3 className={classnames("header1", styles.header1)}>
            Reset Password
          </h3>
          <p className={styles.textInfo}>
            Forgot your password? No worries. Just enter the email you used to
            sign up and we'll send you a link to reset it.
          </p>
          <div className={classnames("fieldWrapper", styles.emailWrapper)}>
            <Input
              className={{ fieldError: touched.email && errors.email }}
              placeholder="Enter Your Email"
              type="email"
              name="email"
              label="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email && touched.email}
              errorMessage={errors.email && touched.email && errors.email}
            />
          </div>

          <Button
            text="Reset password"
            type="submit"
            disabled={isSubmitting}
            className={styles.sendPasswordBtn}
          />

          <div className={styles.goBackLink}>
            <Link to={paths.login}>Go back</Link>
          </div>
        </>
      ) : (
        <>
          <h3 className={classnames("header1", styles.header1)}>
            Reset password link
          </h3>
          <p className={classnames(styles.textConfirm)}>
            We just emailed you link to reset your password. Go your inbox,
            click the link and enter your new password for the account
          </p>
        </>
      )}
    </form>
  );
};

const FormikApp = withFormik({
  mapPropsToValues() {
    return {
      email: ""
    };
  },
  validationSchema: () =>
    object().shape({
      email: string()
        .email("Please enter a valid email")
        .required("Please enter your Email")
    }),
  handleSubmit(
    values,
    {
      setErrors,
      setSubmitting,
      props: { history, handleChange }
    }
  ) {
    setTimeout(() => {
      if (values.email === userInfo.login) {
        handleChange(true);
        setTimeout(() => {
          history.push("/login");
        }, 2000);
      } else {
        setErrors({ email: "The email or password is wrong" });
      }
      setSubmitting(false);
    }, 2000);
  }
})(PasswordRecoveryForm);

export default withUserInfo(withRouter(FormikApp));
