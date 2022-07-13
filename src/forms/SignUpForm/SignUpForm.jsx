import React from "react";
import classnames from "classnames";
import { withFormik } from "formik";
import { object, string, ref } from "yup";
import { Link, withRouter } from "react-router-dom";
import styles from "./SignUpForm.module.scss";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

import withUserInfo from "../../hoc/withUserInfo";
import PasswordInput from "../../components/PasswordInput/PasswordInput";

const SignUpForm = ({
  values,
  errors,
  touched,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit
}) => {
  return (
    <form className={styles.formBody} onSubmit={handleSubmit}>
      <h3 className={classnames("header1", styles.header1)}>Sign Up</h3>

      <div className="fieldWrapper">
        <Input
          className={{ fieldError: touched.userName && errors.userName }}
          placeholder="Enter Your Name"
          type="text"
          name="userName"
          label="User Name"
          value={values.userName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.userName && touched.userName}
          errorMessage={errors.userName && touched.userName && errors.userName}
        />
      </div>

      <div className="fieldWrapper">
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

      <div className="fieldWrapper">
        <PasswordInput
          className={{ fieldError: touched.password && errors.password }}
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

      <div className={classnames("fieldWrapper", "last")}>
        <PasswordInput
          className={{
            fieldError: touched.confirmPassword && errors.confirmPassword
          }}
          placeholder="Confirm Your Password"
          name="confirmPassword"
          label="Confirm Password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.confirmPassword && touched.confirmPassword}
          errorMessage={
            errors.confirmPassword &&
            touched.confirmPassword &&
            errors.confirmPassword
          }
        />
      </div>
      <div className={classnames(styles.signUpBtn)}>
        <Button text="Sign up" type="submit" disabled={isSubmitting} />
      </div>
      <Link to="/login">I already have an account</Link>
    </form>
  );
};

const FormikApp = withFormik({
  mapPropsToValues() {
    return {
      userName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  validationSchema: () =>
    object().shape({
      userName: string().required("Please enter your User Name"),
      email: string()
        .email("Please enter a valid email")
        .required("Please enter your Email"),
      password: string()
        .min(6, "Password must consist of more than 5 symbols ")
        .required("Please enter your Password"),
      confirmPassword: string()
        .min(6, "Password must consist of more than 5 symbols ")
        .oneOf([ref("password"), null], "Passwords don't match")
        .required("Please enter your Password")
    }),
  handleSubmit(
    values,
    {
      setSubmitting,
      props: { handleSignUp }
    }
  ) {
    handleSignUp(values);
    setSubmitting(false);
  }
})(SignUpForm);

export default withUserInfo(withRouter(FormikApp));
