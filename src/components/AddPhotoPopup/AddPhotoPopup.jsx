import React, { useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
// import classNames from "classnames";
import Dropzone from "react-dropzone";
import Crop from "@wyhaya/react-crop-image";
import getCroppedImage, {
  resizedImage,
  createImage
} from "../../helpers/cropImage";

import styles from "./AddPhotoPopup.module.scss";

import { ReactComponent as UploadIcon } from "../../images/icons/uploadCloud.svg";
import Popup from "../Popup/Popup";
import Button from "../Button/Button";
import Input from "../Input/Input";

const AddPhotoPopup = ({ title, onSave, closeAction, src }) => {
  const [file, setFile] = useState(src || null);
  const [insertLink, setInsertLink] = useState(null);
  const [crop, setCrop] = useState({});
  const [dropzoneInFocus, setDropzoneInFocus] = useState(false);
  const dropzoneRef = useRef(null);

  const onDrop = useCallback(async acceptedFiles => {
    setDropzoneInFocus(false);

    const reader = new FileReader();

    reader.addEventListener("load", async () => {
      const image = await createImage(reader.result);
      const newImage = await resizedImage(image);
      setFile(newImage);
    });
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  return (
    <Popup
      title={title}
      acceptButton={
        <Button
          disabled={file ? false : true}
          height="36px"
          width="100px"
          text="Save"
          onClick={async () => {
            onSave(await getCroppedImage(file, crop));
          }}
        />
      }
      button={
        <Button
          buttonStyle="secondary"
          height="36px"
          width="100px"
          text="Cancel"
          onClick={() => {
            closeAction();
          }}
        />
      }
      closeAction={closeAction}
    >
      {!file && (
        <>
          <Dropzone
            onDrop={onDrop}
            onDragOver={() => {
              setDropzoneInFocus(true);
            }}
            onDragLeave={() => {
              setDropzoneInFocus(false);
            }}
            multiple={false}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                className={styles.dropzoneWrap}
                {...getRootProps()}
                style={{
                  background: dropzoneInFocus ? "rgba(47, 128, 237, 0.1)" : null
                }}
              >
                <input {...getInputProps()} />
                <UploadIcon />
                <p>Drag&drop your files anywhere or </p>
                <Button
                  style={{
                    border: "1px solid #82888D",
                    background: "#fff",
                    color: "#000"
                  }}
                  width="120px"
                  height="32px"
                  text="Upload file"
                  ref={dropzoneRef}
                />
              </div>
            )}
          </Dropzone>
          <Input
            className={styles.input}
            placeholder="Insert link"
            value={insertLink}
            onKeyPress={event => {
              if (event.key === "Enter") {
                setFile(event.target.value);
              }
            }}
            onChange={e => {
              setInsertLink(e.target.value);
            }}
          />
        </>
      )}

      {file && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Crop
            // Picture url
            src={file || insertLink}
            // Selected area: x y width height
            crop={crop}
            // Default area
            onInit={(crop, imageWidth, imageHeight) => {
              setCrop(crop);
            }}
            // Change area
            onChange={crop => {
              setCrop(crop);
            }}
          />
        </div>
      )}
    </Popup>
  );
};

AddPhotoPopup.propTypes = {
  title: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  closeAction: PropTypes.func.isRequired
};

AddPhotoPopup.defaultProps = {
  title: "Upload an image",
  onSave: () => {
    console.log("Default onSave function was invoked");
  },
  closeAction: () => {
    console.log("Default closeAction function was invoked");
  }
};

export default AddPhotoPopup;
