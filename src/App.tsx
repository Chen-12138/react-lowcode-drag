import { useRoutes } from "react-router-dom";
import routes, { RouterAuth } from "./router";

function App() {
  const route = useRoutes(routes);

  return <RouterAuth>{route}</RouterAuth>;
}

export default App;
