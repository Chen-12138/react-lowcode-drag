import React from "react";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import logo from "@/asset/img/logo.png";
import Header from "@/components/Header";

const { Content, Sider } = Layout;

const menuItems: MenuProps["items"] = [
  {
    label: <NavLink to="/home/my-work">我的作品</NavLink>,
    key: "my-work",
    icon: <i className="iconfont icon-sheji" />,
  },
  {
    label: <NavLink to="/home/my-template">我的模板</NavLink>,
    key: "my-template",
    icon: <i className="iconfont icon-moban" />,
  },
  {
    label: <NavLink to="/home/my-data">我的数据</NavLink>,
    key: "my-data",
    icon: <i className="iconfont icon-shuju" />,
  },
  {
    label: <NavLink to="/home/creative-template">创意模板</NavLink>,
    key: "creative-template",
    icon: <i className="iconfont icon-store" />,
  },
];

const Home: React.FC = () => {
  const location = useLocation();

  console.log(location);

  return (
    <Layout style={{ height: "100vh" }}>
      <Header />
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0, paddingTop: 14 }}
            items={menuItems}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;
