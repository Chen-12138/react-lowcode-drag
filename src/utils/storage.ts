/**
 * 公共方法
 * */

/**
 * 存储localStorage
 */
export const setLocalStorage = (name: string, content: any) => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getLocalStorage = (name: string) => {
  if (!name) return;
  let data = window.localStorage.getItem(name);

  return data ? JSON.parse(data) : undefined;
};

/**
 * 删除localStorage
 */
export const removeLocalStorage = (name: string) => {
  if (!name) return;
  window.localStorage.removeItem(name);
};
