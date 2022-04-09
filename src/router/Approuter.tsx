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
  "/forms/:formId": ({ formId }: { formId: string }) => (
    <Form formId={Number(formId)} />
  ),
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <Preview previewId={Number(formId)} questionId={0} />
  ),
  "/preview/:formId/:questionid": ({
    formId,
    questionid,
  }: {
    formId: string;
    questionid: string;
  }) => <Preview previewId={Number(formId)} questionId={Number(questionid)} />,
  "/submissions": () => <PreviewListView />,
};

export default function AppRouter() {
  const routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
