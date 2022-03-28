import React, { useState, useEffect, useRef } from "react";
import FormField from "./FormField";

// loading of interfaces
import formField from "../Interfaces/formField";
import formData from "../Interfaces/formData";
import FormListView from "./FormsListView";

const initialformFields: formField[] = [
  { id: 1, label: "First Name", input: "text", value: "" },
  { id: 2, label: "Last Name", input: "text", value: "" },
  { id: 3, label: "Email ", input: "email", value: "" },
  { id: 4, label: "Phone Number ", input: "number", value: "" },
  { id: 5, label: "Date of Birth", input: "date", value: "" },
];

const getLocalForms: () => formData[] = () => {
  const savedFormsJSON = localStorage.getItem("savedForms");
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
};

const initialState: (id: number) => formData = (id: number) => {
  const localForms = getLocalForms();
  if (id === 0) {
    console.log("Going to create a new form");
    const newForm = {
      id: Number(new Date()),
      title: "Untitled Form",
      formFields: initialformFields,
    };
    id = newForm.id;
    console.log("New form id", newForm.id);
    saveLocalForms([...localForms, newForm]);
    console.log(newForm);
    return newForm;
  }
  return localForms.filter((form) => form.id === id)[0];
};

const saveLocalForms = (localForms: formData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

const saveFormData = (currentState: formData) => {
  const localForms = getLocalForms();
  const updatedLocalForms = localForms.map((form) =>
    form.id === currentState.id ? currentState : form
  );
  saveLocalForms(updatedLocalForms);
};

export default function Form(props: {
  formId: number;
  closeFormCB: () => void;
}) {
  const [state, setState] = useState(() => initialState(props.formId));
  const [newField, setNewField] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    console.log("Component mounted");
    const title = document.title;
    document.title = "Form Edit";
    titleRef.current?.focus();
    return () => {
      document.title = "React App";
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("State is being changed");
      console.log(state);
      saveFormData(state);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  const addField = () => {
    setState({
      ...state,
      formFields: [
        ...state.formFields,
        { id: Number(Date.now()), label: newField, input: "text", value: "" },
      ],
    });
    setNewField("");
  };

  const removeField = (id: number) => {
    setState({
      ...state,
      formFields: state.formFields.filter((field) => field.id !== id),
    });
  };

  const clearForm = () => {
    setState({
      ...state,
      formFields: state.formFields.map((field) => ({ ...field, value: " " })),
    });
  };

  const changeField = (id: number, value: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) => {
        if (field.id === id) {
          return { ...field, value: value };
        }
        return field;
      }),
    });
  };

  return (
    <div className="flex flex-col gap-2 p-4 divide-y-2 divide-dotted">
      <div>
        {state.id}
        <input
          value={state.title}
          className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full focus:outline-blue-500 flex-1"
          type="text"
          onChange={(e) => setState({ ...state, title: e.target.value })}
          ref={titleRef}
        />
      </div>
      <div>
        {state.formFields.map((field) => (
          <FormField
            key={field.id}
            field={field}
            removeFieldCB={removeField}
            changeFieldCB={changeField}
          />
        ))}
      </div>
      <div className="flex">
        <input
          value={newField}
          className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full focus:outline-blue-500 flex-1"
          type="text"
          onChange={(e) => setNewField(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 my-4 font-bold rounded-lg"
          onClick={addField}
        >
          Add Field
        </button>
      </div>
      <div className="flex gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 my-4 font-bold rounded-lg"
          onClick={(_) => saveFormData(state)}
        >
          Save
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 my-4 font-bold rounded-lg"
          onClick={props.closeFormCB}
        >
          Close Form
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 my-4 font-bold rounded-lg"
          onClick={clearForm}
        >
          Clear Form
        </button>
      </div>
    </div>
  );
}
