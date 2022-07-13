import React from "react";
import classnames from "classnames";
import { withFormik } from "formik";
import { object, string } from "yup";
import styles from "./CreateTeamPopupForm.module.scss";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

const CreateTeamPopupForm = ({
  values,
  errors,
  touched,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
  closeButton
}) => {
  return (
    <form className={styles.formBody} onSubmit={handleSubmit}>
        <div className={classnames("fieldWrapper", styles.fieldWrapperPopup)}>
            <Input
                className={{ fieldError: touched.name && errors.name }}
                placeholder="Enter team name"
                type="text"
                name="name"
                label="Team name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name && touched.name}
                errorMessage={errors.name && touched.name && errors.name}
            />
        </div>

        <div className={classnames("fieldWrapper", styles.lastInput)}>
            <Input
                className={{ fieldError: touched.email && errors.email }}
                placeholder="Enter email address"
                type="email"
                name="email"
                label="Member email address(es)"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email}
                errorMessage={errors.email && touched.email && errors.email}
            />
        </div>

        <div className={styles.btnsWrap}>
            <Button 
                text="Save" 
                type="submit" 
                disabled={isSubmitting}
                className={styles.popupAccept} 
                width="88px"
                height="36px"
                style={{
                    fontWeight: "bold"
                }}
            />
            <Button 
                text="Cancel"
                onClick={closeButton}  
                className={styles.popupCancel}
                width="88px"
                height="36px"
                style={{
                    background: "#ffffff",
                    color: "#42526E",
                    fontWeight: "bold"
                }}
            />
        </div>

     
    </form>
  );
};

const FormikApp = withFormik({
  mapPropsToValues() {
    return {
        name: "",
        email: ""
    };
  },
  validationSchema: () =>
    object().shape({
        name: string()
            .min(4, "Team name must consist of more than 4 symbols ")
            .required("Please enter team name"),
        email: string()
            .email("Please enter a valid email")
            .required("Please enter member email")
    }),
  handleSubmit(
    values,
    {
      setErrors,
      setSubmitting,
      props: { acceptButton }
    }
  ) {
        acceptButton({name: values.name, email: values.email});
    // setTimeout(() => {
    //   if (
    //     values.email === userInfo.login &&
    //     values.password === userInfo.password
    //   ) {
    //     userLogin(true);
    //     history.push("/");
    //   } else {
    //     setErrors(
    //       { email: "The email or password is wrong" },
    //       { password: "The email or password is wrong" }
    //     );
    //   }
    //   setSubmitting(false);
    // }, 2000);
  }
})(CreateTeamPopupForm);

export default FormikApp;