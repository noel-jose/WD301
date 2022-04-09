import formData from "../Interfaces/formData";
import formField from "../Interfaces/formField";
import previewData from "../Interfaces/previewData";

const initialformFields: formField[] = [
  // { id: 1, label: "First Name", input: "text", value: "" },
  // { id: 2, label: "Last Name", input: "text", value: "" },
  // { id: 3, label: "Email ", input: "email", value: "" },
  // { id: 4, label: "Phone Number ", input: "number", value: "" },
  // { id: 5, label: "Date of Birth", input: "date", value: "" },
];

export const formInputType: string[] = [
  "text",
  "number",
  "date",
  "time",
  "datetime-local",
  "email",
  "tel",
  "url",
  "textarea",
];

// saving data to local storage
export const saveLocalForms = (localForms: formData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

// fetching the saved forms in the localStorage
export const getLocalForms: () => formData[] = () => {
  const savedFormsJSON = localStorage.getItem("savedForms");
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
};

//function to create a new form
export const createForm: () => formData = () => {
  const localForms = getLocalForms();
  const NewForm = {
    id: Number(new Date()),
    title: "Untitled Form",
    formFields: initialformFields,
  };
  saveLocalForms([...localForms, NewForm]);
  console.log("The new Set of saved forms", getLocalForms());
  return NewForm;
};

// function to save preview Data
export const saveLocalPreview = (localPreviews: previewData[]) => {
  localStorage.setItem("savedPreviews", JSON.stringify(localPreviews));
};

// function to fetch the preview data from local storage
export const getLocalPreview: () => previewData[] = () => {
  const savedPreviews = localStorage.getItem("savedPreviews");
  return savedPreviews ? JSON.parse(savedPreviews) : [];
};

// function to create a new Preview
export const createNewPreview: (form: formData) => previewData = (
  form: formData
) => {
  const localPreviews = getLocalPreview();
  const NewPreview: previewData = {
    id: Number(Date.now()),
    formId: form.id,
    title: form.title,
    fields: form.formFields,
    submitted: false,
  };
  console.log("Local Previews:", localPreviews);
  saveLocalPreview([...localPreviews, NewPreview]);
  return NewPreview;
};
