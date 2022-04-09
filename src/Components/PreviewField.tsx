import React from "react";

export default function PreviewField(props: {
  field: { id: number; label: string; inputtype: string; value: string };
  changeFieldCB: (key: number, value: string) => void;
}) {
  return (
    <React.Fragment>
      <div className="flex flex-col m-2">
        <label htmlFor="fieldInput">{props.field.label}</label>
        <input
          name="fieldInput"
          value={props.field.value}
          className="border-2 border-gray-200 rounded-lg p-2 m-1 w-full focus:outline-blue-500 flex-1"
          type={props.field.inputtype}
          onChange={(e) => {
            props.changeFieldCB(props.field.id, e.target.value);
          }}
        />
      </div>
    </React.Fragment>
  );
}
