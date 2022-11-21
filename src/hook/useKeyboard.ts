import { useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../state/reducer";
import useAction from "./useAction";

interface MapType {
  [x: string]: any;
}

const ctrlKey = 17,
  commandKey = 91, // mac command
  vKey = 86, // 粘贴
  cKey = 67, // 复制
  xKey = 88, // 剪切
  yKey = 89, // 重做
  zKey = 90, // 撤销
  sKey = 83, // 保存
  pKey = 80, // 预览
  dKey = 68, // 删除
  deleteKey = 46, // 删除
  eKey = 69; // 清空画布

const keycodes = [66, 67, 68, 69, 71, 76, 80, 83, 85, 86, 88, 89, 90];

export default function useKeyBoard() {
  const { curComponent } = useSelector((state: State) => state.editor);

  const {
    copy,
    paste,
    cut,
    undo,
    redo,
    recordSnapshot,
    deleteComponent,
    clearCanvas,
  } = useAction();

  // 与组件状态无关的操作
  const basemap: MapType = {
    [vKey]: handlePaste,
    [yKey]: redo,
    [zKey]: undo,
    // [sKey]: save,
    // [pKey]: preview,
    [eKey]: clearCanvas,
  };

  // 组件锁定状态下可以执行的操作
  const lockMap: MapType = {
    ...basemap,
    // [uKey]: unlock,
  };

  // 组件未锁定状态下可以执行的操作
  const unlockMap: MapType = {
    ...basemap,
    [cKey]: copy,
    [xKey]: cut,
  };

  // 全局监听按键操作并执行相应命令
  function listenGlobalKeyDown() {
    let isCtrlOrCommandDown = false;
    window.onkeydown = (e) => {
      const { keyCode } = e;
      if (keyCode === ctrlKey || keyCode === commandKey) {
        isCtrlOrCommandDown = true;
      } else if (keyCode == deleteKey && curComponent) {
        deleteComponent();
        recordSnapshot();
      } else if (isCtrlOrCommandDown) {
        if (unlockMap[keyCode] && (!curComponent || !curComponent.isLock)) {
          e.preventDefault();
          unlockMap[keyCode]();
        } else if (lockMap[keyCode] && curComponent && curComponent.isLock) {
          e.preventDefault();
          lockMap[keyCode]();
        }
      }
    };

    window.onkeyup = (e) => {
      if (e.keyCode === ctrlKey || e.keyCode === commandKey) {
        isCtrlOrCommandDown = false;
      }
    };
  }

  function handlePaste() {
    paste();
    recordSnapshot();
  }

  useEffect(() => {
    // 执行监听函数
    listenGlobalKeyDown();
  }, []);
}
