/**
 * 页面相关api
 */
import $axios from "@/service/httpServer";

// 获取我的页面列表
export const getMyPages = (params?: any) =>
  $axios.get("/luckyh5/page/getMyPages", params);

// 新增页面
export const createPage = (params: any) =>
  $axios.post("/luckyh5/page/create", params);

// 获取页面详情
export const getPageDetail = (id: string) =>
  $axios.get("/luckyh5/page/getPageDetail", { id });
