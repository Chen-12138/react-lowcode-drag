import useAction from "@/hook/useAction";
import { PageConfig } from "../config";
import {
  EditOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import styles from "./index.less";
import { State } from "@/state/reducer";
import { useSelector } from "react-redux";
interface PageListProps {
  pageConfig?: PageConfig[];
}

const PageList: React.FC<PageListProps> = ({ pageConfig }) => {
  const { currentPageUUID } = useSelector((state: State) => state.editor);
  const { addPage, deletePage, copyPage, setCurrentPageUUID } = useAction();

  return (
    <div className={styles.pageList}>
      <h2>页面管理</h2>
      {pageConfig?.map((page, index) => {
        return (
          <div
            className={`${styles.pageItem} ${
              page.uuid === currentPageUUID ? styles.active : ""
            }`}
            key={page.uuid}
            onClick={() => setCurrentPageUUID(page.uuid)}
          >
            <div>
              <span className={styles.pageItemIndex}>{index + 1}</span>
              <span>第{index + 1}页</span>
            </div>
            <Dropdown
              menu={{
                items: [
                  {
                    label: (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          addPage(page.uuid);
                        }}
                      >
                        <UserOutlined /> 新增页面
                      </div>
                    ),
                    key: "add",
                  },
                  {
                    label: (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          copyPage(page.uuid);
                        }}
                      >
                        <EditOutlined /> 复制页面
                      </div>
                    ),
                    key: "copy",
                  },
                  {
                    label: (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePage(page.uuid);
                        }}
                      >
                        <PoweroffOutlined /> 删除页面
                      </div>
                    ),
                    key: "delete",
                  },
                ],
              }}
            >
              <div>...</div>
            </Dropdown>
          </div>
        );
      })}
      <Button
        type="primary"
        className={styles.addBtn}
        onClick={() => addPage()}
      >
        添加空白页面
      </Button>
    </div>
  );
};

export default PageList;
