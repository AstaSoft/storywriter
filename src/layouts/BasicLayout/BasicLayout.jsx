import React from "react";
import styles from "./BasicLayout.module.scss";
import { PropTypes } from "prop-types";

import MenuContainer from "../../containers/MenuContainer/MenuContainer";
import UserMenu from "../../components/Menu/UserMenu";
import Button from "../../components/Button/Button";
import { withModal } from "../../context/ModalContext";

const BasicLayout = ({ children, menuType, contentHead, context }) => {
  return (
    <div className={styles.mainWrap}>
      <MenuContainer>{menuType}</MenuContainer>
      <div className={styles.content}>
        {contentHead ? (
          <div className={styles.contentHead}>
            <h2>{contentHead.title}</h2>
            {contentHead.button ? (
              <Button
                text={contentHead.button}
                width="200px"
                height="36px"
                onClick={() => {
                  context.toggleModal(contentHead.action);
                }}
                className={styles.titleBtn}
                style={{
                  borderRadius: "4px"
                }}
              />
            ) : null}
          </div>
        ) : null}
        <div className={styles.contentWrap}>{children}</div>
      </div>
    </div>
  );
};

BasicLayout.propTypes = {
  menuType: PropTypes.element.isRequired,
  contentHead: PropTypes.object
};

BasicLayout.defaultProps = {
  menuType: <UserMenu />,
  contentHead: null
};

export default withModal(BasicLayout);
