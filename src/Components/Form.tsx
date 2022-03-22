import React, { useState } from "react";
import FormField from "./FormField";

const formFields = [
  { id: 1, label: "First Name", input: "text" },
  { id: 2, label: "Last Name", input: "text" },
  { id: 3, label: "Email ", input: "email" },
  { id: 4, label: "Phone Number ", input: "number" },
  { id: 5, label: "Date of Birth", input: "date" },
];

export default function Form(props: { closeFormCB: () => void }) {
  const [state, setState] = useState(formFields);
  const [newField, setNewField] = useState("");
  const addField = () => {
    setState([
      ...state,
      { id: Number(Date.now()), label: newField, input: "text" },
    ]);
    setNewField("");
  };

  const removeField = (id: number) => {
    setState(state.filter((field) => field.id !== id));
  };

  return (
    <div className="flex flex-col gap-2 p-4 divide-y-2 divide-dotted">
      <div>
        {state.map((field) => (
          <FormField key={field.id} field={field} removeFieldCB={removeField} />
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
        <input
          className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-bold my-4"
          type="submit"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 my-4 font-bold rounded-lg"
          onClick={props.closeFormCB}
        >
          Close Form
        </button>
      </div>
    </div>
  );
}
