import { Navigate, RouteObject } from "react-router-dom";
import React, { Suspense } from "react";
import { Spin } from "antd";

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

const route: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/home/my-work" />,
  },
  {
    path: "/login",
    element: lazyLoad(React.lazy(() => import("@/views/Login"))),
  },
  {
    path: "/home",
    element: lazyLoad(React.lazy(() => import("@/views/Home"))),
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
    path: "/editor",
    element: lazyLoad(React.lazy(() => import("@/views/Editor"))),
  },
  {
    path: "/view",
    element: lazyLoad(React.lazy(() => import("@/views/View"))),
  },
];

export default route;
