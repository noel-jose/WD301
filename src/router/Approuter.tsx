import { useRoutes } from "raviger";
import App from "../App";
import About from "../Components/About";
import AppContainer from "../Components/AppContainer";
import Form from "../Components/Form";
import FormListView from "../Components/FormsListView";
import { createForm } from "../utils/utils";

const routes = {
  "/": () => <FormListView />,
  "/about": () => <About />,
  "/forms/create": () => <Form formId={0} />,
  "/forms/:id": ({ id }: { id: string }) => <Form formId={Number(id)} />,
};

export default function AppRouter() {
  const routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
