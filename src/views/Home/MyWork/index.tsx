import WorkCard from "@/components/WorkCard";
import { Project } from "@/service/type";

const MyWork = () => {
  const mockConfig: Project = {
    id: String(Math.random()),
    title: "未命名",
    post: "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b11570bf5df54cea9728f1765e3b9e7b~tplv-k3u1fbpfcp-watermark.image?",
    isPublish: false,
    create_time: 1669169878766,
    update_time: 1669169878766,
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {new Array(9).fill(mockConfig).map((item) => {
        return <WorkCard config={item} key={item.id}></WorkCard>;
      })}
    </div>
  );
};

export default MyWork;
