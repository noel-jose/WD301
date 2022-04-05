import formData from "../Interfaces/formData";
import formField from "../Interfaces/formField";

const initialformFields: formField[] = [
  { id: 1, label: "First Name", input: "text", value: "" },
  { id: 2, label: "Last Name", input: "text", value: "" },
  { id: 3, label: "Email ", input: "email", value: "" },
  { id: 4, label: "Phone Number ", input: "number", value: "" },
  { id: 5, label: "Date of Birth", input: "date", value: "" },
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
