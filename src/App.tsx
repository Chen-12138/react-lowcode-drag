import { useRoutes } from "react-router-dom";
import routes from "./router";
import { useEffect } from "react";
import useUserAction from "./hook/useUserAction";

function App() {
  const route = useRoutes(routes);
  const { updateUserFromLocal } = useUserAction();

  useEffect(() => {
    updateUserFromLocal();
  }, []);

  return <>{route}</>;
}

export default App;
