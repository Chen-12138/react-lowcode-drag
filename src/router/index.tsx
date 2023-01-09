import {
  Navigate,
  RouteObject,
  matchRoutes,
  useLocation,
} from "react-router-dom";
import React, { Fragment, Suspense } from "react";
import { Spin } from "antd";
import useUser from "@/hook/useUser";

export type RouteProps = RouteObject & {
  meta?: {
    auth?: boolean;
  };
  children?: RouteProps[];
};

const lazyLoad = (Comp: React.LazyExoticComponent<any>) => {
  return (
    <Suspense
      fallback={
        <Spin
          size="large"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      }
    >
      <Comp />
    </Suspense>
  );
};

const routes: RouteProps[] = [
  {
    path: "/",
    element: <Navigate to="/home/my-work" />,
    meta: {
      auth: true,
    },
  },
  {
    path: "/login",
    element: lazyLoad(React.lazy(() => import("@/views/Login"))),
  },
  {
    path: "/home",
    element: lazyLoad(React.lazy(() => import("@/views/Home"))),
    meta: {
      auth: true,
    },
    children: [
      {
        path: "my-work",
        element: lazyLoad(React.lazy(() => import("@/views/Home/MyWork"))),
      },
      {
        path: "my-template",
        element: <div>my-template</div>,
      },
      {
        path: "my-data",
        element: <div>my-data</div>,
      },
      {
        path: "creative-template",
        element: <div>creative-template</div>,
      },
    ],
  },
  {
    path: "/editor/:id",
    element: lazyLoad(React.lazy(() => import("@/views/Editor"))),
  },
  {
    path: "/view",
    element: lazyLoad(React.lazy(() => import("@/views/View"))),
  },
];

export const RouterAuth: React.FC<{ children: any }> = ({ children }) => {
  const { checkLoginState } = useUser();
  const location = useLocation();
  // 匹配当前层级的路由
  const matches = matchRoutes(routes, location);
  console.log(matches);
  const isNeedLogin = matches?.some((item) => {
    const route = item.route;

    if (!route.meta) return false;
    // 返回是否需要登录
    return route.meta.auth;
  });

  if (isNeedLogin && !checkLoginState()) {
    console.log("需要登录");
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Fragment>{children}</Fragment>;
};

export default routes;
