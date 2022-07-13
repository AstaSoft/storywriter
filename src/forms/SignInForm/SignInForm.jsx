import React from "react";
import classnames from "classnames";
import { withFormik } from "formik";
import { object, string } from "yup";
import styles from "./SignInForm.module.scss";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { withRouter, Link} from "react-router-dom";
import { paths } from "../../routes/paths";

import { userInfo } from "../../helpers/testData";
import withUserInfo from "../../hoc/withUserInfo";

const SignInForm = ({
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
      <h3 className={classnames("header1", styles.header1)}>Log In</h3>
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

      <div className={classnames("fieldWrapper")} style={{margin: "0"}}>
        <Input
          className={{ fieldError: touched.password && errors.password }}
          placeholder="Enter Your Password"
          type="password"
          name="password"
          label="Password"
          value={values.password}
          onChange={handleChange}
          error={errors.password && touched.password}
          errorMessage={errors.password && touched.password && errors.password}
        />
      </div>

      <div className={classnames(styles.forgotPassword, "fieldWrapper", "last")}>
        <Link to={paths.passwordRecovery}>Forgot password?</Link>
      </div>

      <Button text="Log in" type="submit" disabled={isSubmitting} />

      <div className={classnames(styles.signUpBtn, "fieldWrapper",)}>
        <Link to={paths.registration}>Don’t have an account yet? Sign Up</Link>
      </div>
    </form>
  );
};

const FormikApp = withFormik({
  mapPropsToValues() {
    return {
      email: "",
      password: ""
    };
  },
  validationSchema: () =>
    object().shape({
      email: string()
        .email("Please enter a valid email")
        .required("Please enter your Email"),
      password: string()
        .min(6, "Password must consist of more than 5 symbols ")
        .required("Please enter your Password")
    }),
  handleSubmit(
    values,
    {
      setErrors,
      setSubmitting,
      props: { history, userLogin }
    }
  ) {
    setTimeout(() => {
      if (
        values.email === userInfo.login &&
        values.password === userInfo.password
      ) {
        userLogin(true);
        history.push("/");
      } else {
        setErrors(
          { email: "The email or password is wrong" },
          { password: "The email or password is wrong" }
        );
      }
      setSubmitting(false);
    }, 2000);
  }
})(SignInForm);

export default withUserInfo(withRouter(FormikApp));
