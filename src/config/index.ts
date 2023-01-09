/**
 * 公共配置文件
 */

const configDict: { [x: string]: any } = {
  development: {
    baseURL: "http://localhost:7001",
  },
  production: {
    // baseURL: $config.baseURL
  },
};

const currentConfigKey: string = process.env.NODE_ENV;
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "development";

interface Config {
  isDevelop: string;
  canvasH5Width: number;
  canvasH5Height: number;
  pageModeList: {
    value: string;
    label: string;
    disable: boolean;
  }[];
  [x: string]: any;
}

const configObj: Config = {
  isDevelop: isDev || isTest,
  ...configDict[currentConfigKey],
  // h5模式宽高
  canvasH5Width: 375,
  canvasH5Height: 644,
  pageModeList: [
    {
      value: "h5",
      label: "H5",
      disabled: false,
    },
    {
      value: "longPage",
      label: "长页H5",
      disabled: false,
    },
    {
      name: "relativePage",
      label: "排版图文",
      disabled: true,
    },
    {
      value: "pc",
      label: "PC页面",
      disabled: true,
    },
  ],
};

export default configObj;
