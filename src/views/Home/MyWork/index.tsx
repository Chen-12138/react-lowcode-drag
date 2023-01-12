import { getMyPages } from "@/api";
import WorkCard from "@/components/WorkCard";
import { Project } from "@/service/type";
import { ProjectConfig } from "@/views/Editor/config";
import { useEffect, useState } from "react";

const MyWork = () => {
  const [projectList, setProjectList] = useState<ProjectConfig[]>([]);
  const [searchParams, setSearchParams] = useState({
    type: "my",
    pageMode: "h5",
  });

  const getList = async () => {
    const res = await getMyPages(searchParams);
    setProjectList(res.result.projects);
  };

  useEffect(() => {
    getList();
  }, []);

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
      <WorkCard />
      {projectList.map((item) => {
        return (
          <WorkCard refresh={getList} config={item} key={item._id}></WorkCard>
        );
      })}
    </div>
  );
};

export default MyWork;
