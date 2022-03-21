import React from "react";

export default function FormField(props: {
  field: { id: number; label: string; input: string };
}) {
  return (
    <React.Fragment key={props.field.id}>
      <label className="m-2" htmlFor="">
        {props.field.label}
      </label>
      <input
        className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full focus:outline-blue-500"
        type={props.field.input}
      />
    </React.Fragment>
  );
}
