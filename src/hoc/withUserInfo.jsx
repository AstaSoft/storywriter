import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { userLogin, userLogout } from "../actions/user/userActions";

const withUserInfo = WrappedComponent => {
  class withInfo extends PureComponent {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return connect(
    state => ({
      userInfo: state.user
    }),
    {
      userLogin,
      userLogout
    }
  )(withInfo);
};

export default withUserInfo;
