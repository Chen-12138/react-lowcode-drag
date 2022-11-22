import { Navigate } from "react-router-dom";
import Login from "../views/Login";
import Editor from "../views/Editor";
import Home from "../views/Home";

const route = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
    //创建子路由
    children: [
      {
        path: "mywork",
        element: <div>123</div>,
      },
    ],
  },
  {
    path: "/editor",
    element: <Editor />,
  },
];

export default route;
