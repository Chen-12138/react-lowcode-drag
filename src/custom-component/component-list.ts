// 公共样式
export const commonStyle = {
  rotate: 0,
  opacity: 1,
};

export const commonAttr = {
  animations: [],
  events: {},
  groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  isLock: false, // 是否锁定组件
  collapseName: "style", // 编辑组件时记录当前使用的是哪个折叠面板，再次回来时恢复上次打开的折叠面板，优化用户体验
  linkage: {
    duration: 0, // 过渡持续时间
    data: [
      // 组件联动
      {
        id: "", // 联动的组件 id
        label: "", // 联动的组件名称
        event: "", // 监听事件
        style: [{ key: "", value: "" }], // 监听的事件触发时，需要改变的属性
      },
    ],
  },
};

export interface ComponentListItem {
  component: string;
  label: string;
  propValue: string;
  icon: string;
  style: {
    width: number;
    height: number;
    [x: string]: any;
    // fontSize: string;
    // fontWeight: number;
    // lineHeight: string;
    // letterSpacing: number;
    // textAlign: string;
    // verticalAlign: string;
    // color: string;
  };
  animations?: any;
  events?: any;
  [x: string]: any;
}

// 编辑器左侧组件列表
const list: ComponentListItem[] = [
  {
    component: "Text",
    label: "文字",
    propValue: "双击编辑文字",
    icon: "wenben",
    style: {
      width: 200,
      height: 28,
      fontSize: "",
      fontWeight: 400,
      lineHeight: "",
      letterSpacing: 0,
      textAlign: "",
      color: "",
    },
  },
  {
    component: "Button",
    label: "按钮",
    propValue: "双击编辑按钮",
    icon: "anniu",
    style: {
      width: 100,
      height: 34,
      borderWidth: 1,
      borderColor: "",
      borderRadius: "",
      fontSize: "",
      fontWeight: 400,
      lineHeight: "",
      letterSpacing: 0,
      textAlign: "",
      color: "",
      backgroundColor: "",
    },
  },
  {
    component: "Rect",
    label: "矩形",
    propValue: "&nbsp;",
    icon: "xingzhuang-juxing",
    style: {
      width: 100,
      height: 100,
      fontSize: "",
      fontWeight: 400,
      lineHeight: "",
      letterSpacing: 0,
      textAlign: "center",
      color: "",
      borderColor: "#000",
      borderWidth: 1,
      backgroundColor: "#fff",
      borderStyle: "solid",
      borderRadius: "",
      verticalAlign: "middle",
    },
  },
  {
    component: "Circle",
    label: "圆形",
    propValue: "&nbsp;",
    icon: "radio-on",
    style: {
      width: 100,
      height: 100,
      fontSize: "",
      fontWeight: 400,
      lineHeight: "",
      letterSpacing: 0,
      textAlign: "center",
      color: "",
      borderColor: "#000",
      borderWidth: 1,
      backgroundColor: "#fff",
      borderStyle: "solid",
      borderRadius: "",
      verticalAlign: "middle",
    },
  },
  {
    component: "Image",
    label: "图片",
    propValue:
      "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b11570bf5df54cea9728f1765e3b9e7b~tplv-k3u1fbpfcp-watermark.image?",
    icon: "tupian",
    style: {
      width: 200,
      height: 200,
    },
  },
  {
    component: "Music",
    label: "音乐",
    propValue:
      "https://other-web-ra01-sycdn.kuwo.cn/5c650cd4d3b798405ed9bfab4ae1fe18/63941698/resource/n3/320/31/1/1060334909.mp3",
    icon: "tupian",
    style: {
      width: 200,
      height: 200,
    },
  },
];

for (let i = 0, len = list.length; i < len; i++) {
  const item = list[i];
  //   item.style = { ...commonStyle, ...item.style };
  list[i] = { ...commonAttr, ...item };
}

export default list;
