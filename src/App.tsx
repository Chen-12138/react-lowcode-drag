import React, { useState } from "react";
import Toolbar from "./components/Toolbar";
import "./App.css";

function App() {
  return <div>
    <Toolbar/>
    <main>
      {/* 左侧组件列表 */}
      <section className="left">
        <div>componentList</div>
        <div>realTimeComponentList</div>
      </section>
      {/* 中间画布 */}
      <section className="center">
        <div className="content">
          editor
        </div>
      </section>
      {/* 右侧属性列表 */}
      <section className="right">
        <div>
          <div>属性： xxx</div>
          <div>动画： xxx</div>
          <div>事件： xxx</div>
        </div>
      </section>
    </main>
  </div>
}

export default App;
