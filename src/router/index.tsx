import { Navigate } from "react-router-dom";
import Login from "../views/Login";
import Editor from "../views/Editor";
import Home from "../views/Home";
import MyWork from "@/views/Home/MyWork";
import View from "@/views/View";

const route = [
  {
    path: "/",
    element: <Navigate to="/home/my-work" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "my-work",
        element: <MyWork />,
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
    element: <Editor />,
  },
  {
    path: "/view",
    element: <View />,
  },
];

export default route;
