import { useRoutes } from "raviger";
import App from "../App";
import About from "../Components/About";
import AppContainer from "../Components/AppContainer";

const routes = {
  "/": () => <App />,
  "/about": () => <About />,
};

export default function AppRouter() {
  const routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
