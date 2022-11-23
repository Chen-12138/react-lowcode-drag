export interface Project {
  id: string;
  // 标题
  title: string;
  // 封面图
  post: string;
  // 是否已经发布
  isPublish: boolean;
  // 创建时间
  create_time: number;
  // 更新时间
  update_time: number;
}
