import React, { useEffect, useState } from "react";
import "./index.css";
import { createPortal } from "react-dom";

const Modal = (props: any) => {
  const { children, visible, header, closeModal } = props;

  const [bodyOverflow, setBodyOverflow] = useState("");

  useEffect(() => {
    // 在第一次渲染时取 body 原始的 overflow 值
    setBodyOverflow(window.getComputedStyle(document.body).overflow);
  }, []);

  useEffect(() => {
    // 根据 visible 来动态修改 body 的 overflow 值
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = bodyOverflow;
    }
  }, [visible, bodyOverflow]);

  function handleClick(event: any) {
    // 点击蒙层自己时关闭模态框，点击模态框的内容时不关闭
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  const modal = createPortal(
    <div className="overlay" onClick={handleClick}>
      <div className="modal">
        <div className="header">
          {header || "默认头部"}
          <button className="closeBtn" onClick={closeModal}>
            X
          </button>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>,
    document.body
  );

  return <div>{visible && modal}</div>;
};

export default React.memo(Modal);
