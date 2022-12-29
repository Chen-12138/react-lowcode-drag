import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "@/state/reducer";
import { ComponentListItem } from "../component-list";
import styles from "./index.less";
import useAction from "@/hook/useAction";

interface TextProps {
  element: ComponentListItem;
}

const Text: React.FC<TextProps> = function ({ element }) {
  const { editMode, curComponent } = useSelector(
    (state: State) => state.editor
  );
  const { setComponentContent } = useAction();
  const [canEdit, setCanEdit] = useState(false);
  const textRef = useRef({} as HTMLDivElement);

  const setEdit = () => {
    setCanEdit(true);
    selectText(textRef.current);
  };

  const handleMouseDown = (e: any) => {
    if (canEdit) {
      e.stopPropagation();
    }
  };

  const handleBlur = (e: any) => {
    console.log(e.target);
    console.log(textRef.current);
    if (e.target !== textRef.current) {
      console.log(123);
      setComponentContent(textRef.current.innerHTML || "&nbsp;");
      setCanEdit(false);
    }
    console.log(456);
  };

  useEffect(() => {
    if (curComponent !== element) {
      setCanEdit(false);
      clearSelectText();
    }
  }, [curComponent]);

  useEffect(() => {
    if (canEdit) {
      window.addEventListener("click", handleBlur, false);
    } else {
      window.removeEventListener("click", handleBlur);
    }
  }, [canEdit]);

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
