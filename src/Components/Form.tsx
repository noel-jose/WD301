import React, { useState, useEffect, useRef } from "react";
import FormField from "./FormField";
import { createForm, saveLocalForms } from "../utils/utils";
import { Link } from "raviger";
import { navigate } from "raviger";

// loading of interfaces

import formData from "../Interfaces/formData";
import { formInputType } from "../utils/utils";

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
  const [state, setState] = useState(() => initialState(props.formId));
  const [newField, setNewField] = useState("");
  const [type, setType] = useState("text");
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

  const addField = () => {
    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
          id: state.formFields.length,
          label: newField,
          inputtype: type,
          value: "",
        },
      ],
    });
    setNewField("");
  };

  // function to remove a question in a quiz
  const removeField = (id: number) => {
    setState({
      ...state,
      formFields: state.formFields.filter((field) => field.id !== id),
    });
  };

  // function to change the question in a quiz
  const changeField = (id: number, value: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) => {
        if (field.id === id) {
          return { ...field, label: value };
        }
        return field;
      }),
    });
  };

  return (
    <div className="flex flex-col gap-2 p-4 divide-y-4 divide-dotted">
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
          <FormField
            key={field.id}
            field={field}
            removeFieldCB={removeField}
            changeFieldCB={changeField}
          />
        ))}
      </div>
      <div className="flex ">
        <div>
          <label htmlFor="questiontitle">Question</label>
          <input
            name="questiontitle"
            value={newField}
            className="border-2 border-gray-200 rounded-lg p-2 m-2  focus:outline-blue-500 flex-1"
            type="text"
            onChange={(e) => setNewField(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="inputtype">Input Type</label>
          <select
            name="inputtype"
            className="border-2 border-gray-200 rounded-lg p-2 m-2  focus:outline-blue-500 flex-1"
            onChange={(e) => setType(e.target.value)}
          >
            {formInputType.map((type) => (
              <option value={type}>{type}</option>
            ))}
          </select>
        </div>
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
