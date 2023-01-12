import { ComponentListItem } from "@/custom-component/component-list";
import config from "@/config";
import { cloneDeep } from "lodash";
import { createUUID } from "@/utils/utils";
import { CanvasStyleData } from "@/state/reducers/editor";

// 项目配置信息字段
export interface ProjectConfig {
  _id?: string;
  name: string;
  title: string;
  description: string;
  coverImage: string;
  author: string;
  script: string;
  canvasStyleData: CanvasStyleData;
  width: number;
  height: number;
  pages: PageConfig[];
  [x: string]: any;
}

const projectConfig: ProjectConfig = {
  name: "",
  title: "未命名场景",
  description: "我用Luckh5可视化编辑器做了一个炫酷的H5，快来看看吧~",
  coverImage: "",
  author: "",
  script: "",
  canvasStyleData: {
    width: 1280,
    height: 720,
    scale: 100,
    color: "#000000",
    opacity: 1,
    backgroundColor: "#4A90E2",
    fontSize: 14,
  },
  width: config.canvasH5Width,
  height: config.canvasH5Height,
  pages: [],
};

// 页面配置信息字段
export interface PageConfig {
  uuid?: string;
  name: string;
  componentData: ComponentListItem[];
  config: any;
}

const pageConfig: PageConfig = {
  name: "",
  componentData: [],
  config: {},
};

export const getProjectConfig: () => ProjectConfig = () => {
  let project = cloneDeep(projectConfig);
  let onePage = getPageConfig();
  project.pages.push({
    ...onePage,
  });
  return project;
};

export const getPageConfig: () => PageConfig = () => {
  return {
    uuid: createUUID(),
    ...cloneDeep(pageConfig),
  };
};

export const copyPage = (data?: PageConfig) => {
  if (data) {
    const pageData = cloneDeep(data);
    pageData.uuid = createUUID();
    return pageData;
  }
  return getPageConfig();
};
