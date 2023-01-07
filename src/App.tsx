import { useRoutes } from "react-router-dom";
import routes, { RouterAuth } from "./router";
import { useEffect } from "react";
import useUserAction from "./hook/useUserAction";

function App() {
  const route = useRoutes(routes);
  const { updateUserFromLocal } = useUserAction();

  useEffect(() => {
    updateUserFromLocal();
  }, []);

  return <RouterAuth>{route}</RouterAuth>;
}

export default App;
