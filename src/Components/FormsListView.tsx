import React, { useState } from "react";

// loading interfaces
import formData from "../Interfaces/formData";

// fetching the saved forms in the localStorage
const getLocalForms: () => formData[] = () => {
  const savedFormsJSON = localStorage.getItem("savedForms");
  // console.log(savedFormsJSON);
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
};

// deleting the form from savedForms whoose id is specified
const deleteForm: (id: number) => formData[] = (id: number) => {
  const localForms = getLocalForms();
  const modifiedForms = localForms.filter((form) => form.id !== id);
  localStorage.setItem("savedForms", JSON.stringify(modifiedForms));
  return modifiedForms;
};

export default function FormListView(props: {
  openFormCB: (id: number) => void;
}) {
  const [forms, setForms] = useState(() => getLocalForms());

  // deletes the form and updates the savedForm in localStorage
  const deleteLocalForm: (id: number) => void = (id: number) => {
    setForms(deleteForm(id));
  };

  console.log(forms);

  return (
    <div className="p-2">
      {forms ? (
        forms.map((form) => (
          <div
            key={form.id}
            className="flex justify-between p-4 rounded-lg shadow-md w-auto"
          >
            <div className="font-semibold mr-2">{form.title}</div>
            <div className="flex justify-between">
              <button
                onClick={(_) => props.openFormCB(form.id)}
                className="bg-green-500 hover:bg-green-700 text-white px-2 py-1  mx-2 font-bold rounded-lg"
              >
                Open
              </button>
              <button
                onClick={(_) => deleteLocalForm(form.id)}
                className="bg-red-500 hover:bg-red-700 text-white  px-2 py-1 mx-2 font-bold rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No Forms</p>
      )}
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 my-4 font-bold rounded-lg w-full"
          onClick={(_) => props.openFormCB(0)}
        >
          Create Form
        </button>
      </div>
    </div>
  );
}
