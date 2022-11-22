import { CSSProperties, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "@/state/reducer";
import { ComponentListItem } from "../component-list";
import styles from "./index.less";

interface TextProps {
  element: ComponentListItem;
}

const Text: React.FC<TextProps> = function ({ element }) {
  const { editMode, curComponent } = useSelector(
    (state: State) => state.editor
  );
  const [canEdit, setCanEdit] = useState(false);
  const textRef = useRef(null);

  const setEdit = () => {
    setCanEdit(true);
    selectText(textRef.current!);
  };

  const handleMouseDown = (e: any) => {
    if (canEdit) {
      e.stopPropagation();
    }
  };

  const handleBlur = (e: any) => {
    if (e.target !== textRef.current) {
      element.propValue = e.target.innerHTML || "&nbsp;";
      setCanEdit(false);
    }
  };

  useEffect(() => {
    if (curComponent !== element) {
      setCanEdit(false);
      clearSelectText();
    }
  }, [curComponent]);

  const selectText = (element: Node) => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const clearSelectText = () => {
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
    }
  };

  return (
    <>
      {editMode === "edit" ? (
        <div className={styles.text}>
          <div
            ref={textRef}
            className={` ${canEdit ? styles["can-edit"] : ""}`}
            style={{ verticalAlign: element.style.verticalAlign }}
            contentEditable={canEdit}
            onDoubleClick={setEdit}
            onMouseDown={handleMouseDown}
            onClick={handleBlur}
            onBlur={handleBlur}
            dangerouslySetInnerHTML={{ __html: element.propValue }}
          ></div>
        </div>
      ) : (
        <div className={` ${canEdit ? styles["can-edit"] : ""}`}>
          {element.propValue}
        </div>
      )}
    </>
  );
};

export default Text;
