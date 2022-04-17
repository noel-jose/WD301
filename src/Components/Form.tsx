import React, { useState, useEffect, useRef } from "react";
import FormField from "./FormField";
import { createForm, saveLocalForms } from "../utils/utils";
import { Link } from "raviger";
import { navigate } from "raviger";

// loading of interfaces

import { formData } from "../types/formData";
import { formInputType } from "../utils/utils";
import { textFieldTypes, formField, formFieldType } from "../types/formField";
import MultipleInput from "./MultipleInput";

// getting data from the saved forms
const getLocalForms: () => formData[] = () => {
  const savedFormsJSON = localStorage.getItem("savedForms");
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
};

// initializing a form
const initialState: (id: number) => formData = (id: number) => {
  const localForms = getLocalForms();
  return localForms.find((form) => form.id === id) || createForm();
};

const saveFormData = (currentState: formData) => {
  const localForms = getLocalForms();
  const updatedLocalForms = localForms.map((form) =>
    form.id === currentState.id ? currentState : form
  );
  saveLocalForms(updatedLocalForms);
};

export default function Form(props: { formId: number }) {
  const [state, setState] = useState(() => initialState(props.formId)); // holds the current form
  const [newFieldLabel, setNewFieldLabel] = useState(""); // holds the label for the new field
  const [kind, setKind] = useState("text" as formFieldType); // holds the kind of formField to be used
  const [textFieldType, setTextFieldType] = useState("text" as textFieldTypes); //holds the TextfieldType for a TExt field
  const [fieldOptions, setFieldOptions] = useState([]); // holds the options for a field
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const title = document.title;
    document.title = "Form Edit";
    titleRef.current?.focus();
    return () => {
      document.title = "React App";
    };
  }, []);

  useEffect(() => {
    state.id !== props.formId && navigate(`/forms/${state.id}`);
  }, [state.id, props.formId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      saveFormData(state);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  // function that adds a field to the current form
  const addField = () => {
    let newField: {
      id: number;
      kind: formFieldType;
      label: string;
      options?: string[];
      fieldType?: textFieldTypes;
      value: string;
    };
    switch (kind) {
      case "text":
      case "textarea":
        newField = {
          kind: kind,
          id: state.formFields.length,
          label: newFieldLabel,
          fieldType: textFieldType,
          value: "",
        };
        break;
      case "dropdown":
      case "radio":
      case "multiselect":
        newField = {
          kind: kind,
          id: state.formFields.length,
          label: newFieldLabel,
          options: [],
          value: "",
        };
    }
    setState({
      ...state,
      formFields: [...state.formFields, newField as formField],
    });
    setNewFieldLabel("");
  };

  //function to update the options of a field
  const updateOptions = (id: number, index: number, option: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) => {
        if (
          field.id === id &&
          (field.kind === "dropdown" ||
            field.kind === "radio" ||
            field.kind === "multiselect")
        ) {
          console.log(field.id + " " + index + " " + option);
          if (index < field.options.length) {
            field.options[index] = option;
          } else {
            field.options.push(option);
          }
          return field;
        }
        return field;
      }),
    });
  };

  // function to delete the options of a field
  const deleteOptions = (id: number, index: number) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) => {
        if (
          field.id === id &&
          (field.kind === "dropdown" ||
            field.kind === "radio" ||
            field.kind === "multiselect")
        ) {
          field.options.splice(index, 1);
        }
        return field;
      }),
    });
  };

  // function to remove a question in a quiz
  const removeField = (id: number) => {
    setState({
      ...state,
      formFields: state.formFields.filter((field) => field.id !== id),
    });
  };

  // function to change the question in a quiz
  const changeField = (id: number, label: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) => {
        if (field.id === id) {
          return { ...field, label: label };
        }
        return field;
      }),
    });
  };

  return (
    <div className="flex flex-col gap-2 p-4 divide-y-2">
      {console.log(state)}
      <div>
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
          <div key={field.id}>
            {field.kind === "text" || field.kind === "textarea" ? (
              <FormField
                key={field.id}
                field={field}
                removeFieldCB={removeField}
                changeFieldCB={changeField}
              />
            ) : (
              <MultipleInput
                key={field.id}
                field={field}
                removeFieldCB={removeField}
                changeFieldCB={changeField}
                updateOptionsCB={updateOptions}
                deleteOptionsCB={deleteOptions}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex ">
        <div>
          <label htmlFor="questiontitle">Question</label>
          <input
            name="questiontitle"
            value={newFieldLabel}
            className="border-2 border-gray-200 rounded-lg p-2 m-2  focus:outline-blue-500 flex-1"
            type="text"
            onChange={(e) => setNewFieldLabel(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="inputtype">Input Type</label>
          <select
            name="inputtype"
            className="border-2 border-gray-200 rounded-lg p-2 m-2  focus:outline-blue-500 flex-1"
            onChange={(e) => setKind(e.target.value as formFieldType)}
          >
            <option value="text">Text</option>
            <option value="textarea">Textarea</option>
            <option value="dropdown">Dropdown</option>
            <option value="radio">Radio</option>
            <option value="multiselect">Multi-select</option>
          </select>
        </div>
        {kind === "text" ? (
          <select
            name="inputtype"
            className="border-2 border-gray-200 rounded-lg p-2 m-2  focus:outline-blue-500 flex-1"
            onChange={(e) => setTextFieldType(e.target.value as textFieldTypes)}
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="date">Date</option>
            <option value="number">Number</option>
          </select>
        ) : (
          []
        )}
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
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 my-4 font-bold rounded-lg"
          href="/"
        >
          Close Form
        </Link>
      </div>
    </div>
  );
}
