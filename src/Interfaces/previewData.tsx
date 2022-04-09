import formField from "../Interfaces/formField";

export default interface previewData {
  id: number;
  formId: number;
  title: string;
  fields: formField[];
  submitted: boolean;
}
