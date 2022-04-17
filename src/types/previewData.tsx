import { formField } from "./formField";

export type previewData = {
  id: number;
  formId: number;
  title: string;
  fields: formField[];
  submitted: boolean;
};
