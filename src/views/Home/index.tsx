import React from "react";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";
import logo from "@/asset/img/logo.png";
import Header from "@/components/Header";

const { Content, Sider } = Layout;

const menuItems: MenuProps["items"] = [
  {
    label: "我的作品",
    key: "work",
    icon: <i className="iconfont icon-sheji" />,
  },
  {
    label: "我的模板",
    key: "template",
    icon: <i className="iconfont icon-moban" />,
  },
  {
    label: "我的数据",
    key: "data",
    icon: <i className="iconfont icon-shuju" />,
  },
  {
    label: "创意模板",
    key: "creative-template",
    icon: <i className="iconfont icon-store" />,
  },
];

const App: React.FC = () => (
  <Layout style={{ height: "100vh" }}>
    <Header />
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0, paddingTop: 14 }}
          items={menuItems}
        />
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
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

export default App;
