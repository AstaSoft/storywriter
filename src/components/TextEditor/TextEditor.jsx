import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import styles from "./TextEditor.module.scss";

import boldIcon from "../../images/icons/boldIcon.svg";
import italicIcon from "../../images/icons/italicIcon.svg";
import underlineIcon from "../../images/icons/underlineIcon.svg";
import unorderedList from "../../images/icons/unorderedIcon.svg";
import orderedList from "../../images/icons/orderedIcon.svg";

const TextEditor = ({ text, placeholder, onSave, id }) => {
  const [content, setContent] = useState();
  const [rawText, setRawText] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const setEditorReference = ref => {
    if (ref) {
      ref.focus();
    }
  };

  const isContentInText = text => {
    const textObj = JSON.parse(text);
    return textObj.blocks.some(element => element.text.trim() !== "");
  };

  const onContentStateChange = text => {
    setContent(text);
    setRawText(JSON.stringify(text));
  };

  useEffect(() => {
    setRawText();
    setContent(JSON.parse(text));
  }, [text]);
  return (
    <div
      onClick={() => {
        setIsVisible(true);
      }}
    >
      {isVisible ? (
        <Editor
          //   editorState={editorState}
          editorRef={setEditorReference}
          readOnly={!isVisible}
          wrapperClassName={styles.wrapperClass}
          editorClassName={styles.editorClass}
          toolbarClassName={
            isVisible ? styles.toolbarClass : styles.hiddenToolbar
          }
          stripPastedStyles
          initialContentState={content}
          onContentStateChange={onContentStateChange}
          onFocus={() => {
            setIsVisible(true);
          }}
          onBlur={() => {
            setIsVisible(false);
            onSave(id, rawText);
          }}
          toolbar={{
            options: ["inline", "list"],
            inline: {
              className: styles.inlineWrapper,
              options: ["bold", "italic", "underline"],
              bold: { icon: boldIcon, className: styles.tool },
              italic: { icon: italicIcon, className: styles.tool },
              underline: { icon: underlineIcon, className: styles.tool }
            },
            list: {
              className: styles.listWrapper,
              options: ["unordered", "ordered"],
              unordered: { icon: unorderedList, className: styles.tool },
              ordered: { icon: orderedList, className: styles.tool }
            }
          }}
        />
      ) : isContentInText(text) ? (
        <div
          style={{ cursor: "pointer" }}
          dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(text)) }}
        ></div>
      ) : (
        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            setIsVisible(true);
          }}
          className={styles.placeholder}
        >
          {placeholder}
        </p>
      )}
    </div>
  );
};

export default TextEditor;
