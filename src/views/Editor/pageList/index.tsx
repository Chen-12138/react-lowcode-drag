import { PageConfig } from "../config";

interface PageListProps {
  pageConfig?: PageConfig[];
}

const PageList: React.FC<PageListProps> = ({ pageConfig }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>页面管理</h2>
      {pageConfig?.map((page, index) => {
        return <div>第{index + 1}页</div>;
      })}
    </div>
  );
};

export default PageList;
