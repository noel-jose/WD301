import { useRoutes } from "raviger";
import About from "../Components/About";
import AppContainer from "../Components/AppContainer";
import Form from "../Components/Form";
import FormListView from "../Components/FormsListView";
import Preview from "../Components/Preview";
import PreviewListView from "../Components/PreviewListView";

const routes = {
  "/": () => <FormListView />,
  "/about": () => <About />,
  "/forms/create": () => <Form formId={0} />,
  "/forms/:id": ({ id }: { id: string }) => <Form formId={Number(id)} />,
  "/preview/:id": ({ id }: { id: string }) => (
    <Preview previewId={Number(id)} questionId={0} />
  ),
  "/preview/:id/:questionid": ({
    id,
    questionid,
  }: {
    id: string;
    questionid: string;
  }) => <Preview previewId={Number(id)} questionId={Number(questionid)} />,
  "/submissions": () => <PreviewListView />,
};

export default function AppRouter() {
  const routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
