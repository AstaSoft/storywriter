import React from "react";
import classNames from "classnames";
import styles from "./DictionaryContainer.module.scss";
import DotsMenuBar from "../../components/DotsMenuBar/DotsMenuBar";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AddComment from "../../components/AddComment/AddComment";
// import Content from "./Content";
// import { Context } from "./DictionaryContainerLeft";
import AddScreenPopup from "../../components/AddScreenPopup/AddScreenPopup";
import ScreenShotElement from "../../components/ScreenShotElement/ScreenShotElement";
import Button from "../../components/Button/Button";
import {
  Modal,
  withModal,
  NotificationPopup
} from "../../context/ModalContext";
import TextEditor from "../../components/TextEditor/TextEditor";

class DictionaryContainerRight extends React.Component {
  state = {
    isSHowAddScreenPopup: false
  };

  handleDelete = () => {
    this.props.context.toggleNotification("deletedScreenShot");
    this.props.context.closeModal();
  };

  showPopupToggler = status => {
    this.setState({
      isSHowAddScreenPopup: status
    });
  };

  saveHandler = screenshotURL => {
    this.props.addScreenShot(screenshotURL);
  };

  deleteScreen = () => {
    this.props.context.toggleModal("deletedScreenShot");
  };

  render() {
    const {
      content,
      deleteTerm,
      index,
      context,
      onSaveDescription
    } = this.props;
    const { isSHowAddScreenPopup } = this.state;

    return (
      <>
        <NotificationPopup
          id="deletedScreenShot"
          type="fail"
          title="Screenshot removed"
          text="You’ve deleted the ScreenShot. You can create a new one"
        />
        <NotificationPopup
          id="addedScreenShot"
          type="success"
          title="Screenshot added"
          text="You’ve successfully added screenshot."
        />

        <Modal
          id="deletedScreenShot"
          isCrossIcon={false}
          className={styles.deletePopup}
        >
          <p className={styles.deleteText}>
            Are you sure you want to delete this screenshot?
          </p>
          <div className={styles.deletePopupBtns}>
            <Button
              text="Cancel"
              onClick={context.closeModal}
              width="88px"
              height="36px"
              style={{
                background: "none",
                color: "#42526E",
                marginRight: "16px"
              }}
            />
            <Button
              text="Delete"
              onClick={this.handleDelete}
              className={styles.popupDelete}
              width="88px"
              height="36px"
            />
          </div>
        </Modal>

        <div className={styles.contentWrapper}>
          {isSHowAddScreenPopup && (
            <AddScreenPopup
              title="Upload an image"
              onSave={newPhoto => {
                this.saveHandler(newPhoto);
                this.showPopupToggler(false);
              }}
              closeAction={this.showPopupToggler}
            />
          )}
          {this.props.content ? (
            <>
              <div className={styles.contentHead}>
                <h3>{content.label}</h3>
                <DotsMenuBar
                  direction="left"
                  deleteItem={deleteTerm}
                  index={index}
                />
              </div>

              <div
                className={classNames(
                  styles.contentDiscription,
                  styles.contentItem
                )}
              >
                <h5>Description</h5>
                {/* {content.description ? (
                  <div className={styles.fullTextItem}>
                    {content.description}
                  </div>
                ) : ( */}
                <TextEditor
                  onSave={onSaveDescription}
                  id={index}
                  className={styles.emptyItem}
                  placeholder="Add description here"
                  text={content.description}
                />
                {/* )} */}
              </div>

              <div
                className={classNames(
                  styles.contentScreenshot,
                  styles.contentItem
                )}
              >
                <h5>Screenshots</h5>
                {content.screenshots.length ? (
                  <div className={classNames(styles.fullItem, styles.addItem)}>
                    {content.screenshots.map(screenshot => (
                      <ScreenShotElement
                        key={screenshot.id}
                        image={screenshot.url}
                        deleteScreen={this.deleteScreen}
                      />
                    ))}
                  </div>
                ) : null}

                <span
                  className={classNames(styles.emptyItem, styles.addItem)}
                  onClick={() => this.showPopupToggler(true)}
                >
                  + Add screenshots
                </span>
              </div>

              <div
                className={classNames(styles.contentLink, styles.contentItem)}
              >
                <h5>Links</h5>
                {content.links.length ? (
                  <div className={classNames(styles.fullItem, styles.addItem)}>
                    {content.links.map((link, index) => (
                      <Link to="/" className={styles.links} key={index}>
                        {link}
                      </Link>
                    ))}
                  </div>
                ) : null}
                <div className={classNames(styles.emptyItem, styles.addItem)}>
                  + Add link
                </div>
              </div>

              <div
                className={classNames(
                  styles.contentComment,
                  styles.contentItem
                )}
              >
                <h5>Comments</h5>
                {content.comments ? (
                  <div className={classNames(styles.fullItem, styles.addItem)}>
                    {content.comments}
                  </div>
                ) : null}
                <div className={classNames(styles.addItem)}>
                  <AddComment />
                </div>
              </div>
            </>
          ) : null}
        </div>
      </>
    );
  }
}

DictionaryContainerRight.propTypes = {
  content: PropTypes.shape({
    description: PropTypes.string,
    screenshots: PropTypes.array,
    links: PropTypes.array
  })
};

DictionaryContainerRight.defaultProps = {
  content: {
    description: "",
    screenshots: [],
    links: []
  }
};

export default withModal(DictionaryContainerRight);
