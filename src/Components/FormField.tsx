import React from "react";

export default function FormField(props: {
  field: { id: number; label: string; input: string };
  removeFieldCB: (id: number) => void;
}) {
  return (
    <React.Fragment>
      <label className="m-2" htmlFor="">
        {props.field.label}
      </label>
      <div className="flex gap-2">
        <input
          className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full focus:outline-blue-500 flex-1"
          type={props.field.input}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 my-4 font-bold rounded-lg"
          onClick={(_) => props.removeFieldCB(props.field.id)}
        >
          Remove
        </button>
      </div>
    </React.Fragment>
  );
}
