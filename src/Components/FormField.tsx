import React, { useState } from "react";

export default function FormField(props: {
  field: { id: number; label: string; input: string; value: string };
  removeFieldCB: (id: number) => void;
  changeFieldCB: (key: number, value: string) => void;
}) {
  return (
    <React.Fragment>
      <label className="m-2" htmlFor="">
        {props.field.label}
      </label>
      <div className="flex gap-2">
        <input
          value={props.field.value}
          className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full focus:outline-blue-500 flex-1"
          type={props.field.input}
          onChange={(e) => {
            props.changeFieldCB(props.field.id, e.target.value);
          }}
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
