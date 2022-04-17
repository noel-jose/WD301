import React, { useEffect, useState } from "react";
import { formField } from "../types/formField";
import { MultiSelect } from "react-multi-select-component";

export default function PreviewField(props: {
  field: formField;
  changeFieldCB: (key: number, value: string) => void;
}) {
  const setToSelectedArray = (selected: string) => {
    const selectedOptions = selected.split(",");
    return selectedOptions.map((selected) => ({
      label: selected,
      value: selected,
    }));
  };
  const [selected, setSelected] = useState(
    props.field.value ? setToSelectedArray(props.field.value) : []
  );

  const getSelectedArray = () => {
    return selected.map((select) => select.value).toString();
  };

  useEffect(() => {
    props.changeFieldCB(props.field.id, getSelectedArray());
  }, [selected]);

  return (
    <React.Fragment>
      <div className="flex flex-col m-2">
        <label htmlFor="fieldInput">{props.field.label}</label>

        {props.field.kind === "text" ? (
          <input
            name="fieldInput"
            value={props.field.value}
            className="border-2 border-gray-200 rounded-lg p-2 m-1 w-full focus:outline-blue-500 flex-1"
            type={props.field.fieldType}
            onChange={(e) => {
              props.changeFieldCB(props.field.id, e.target.value);
            }}
          />
        ) : props.field.kind === "textarea" ? (
          <textarea
            name="fieldInput"
            value={props.field.value}
            className="border-2 border-gray-200 rounded-lg p-2 m-1 w-full focus:outline-blue-500 flex-1"
            onChange={(e) => {
              props.changeFieldCB(props.field.id, e.target.value);
            }}
          />
        ) : props.field.kind === "dropdown" ? (
          <select
            className="border-5 border-blue-600 rounded-lg p-2 m-2 w-full"
            onChange={(e) => {
              props.changeFieldCB(props.field.id, e.target.value);
            }}
            value={props.field.value}
          >
            {props.field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : props.field.kind === "radio" ? (
          props.field.options.map((option) => (
            <div>
              <input
                name="radioinput"
                type="radio"
                checked={props.field.value === option}
                value={option}
                onChange={(e) => {
                  props.changeFieldCB(props.field.id, e.target.value);
                }}
              />
              <label htmlFor="radioinput">{option}</label>
            </div>
          ))
        ) : props.field.kind === "multiselect" ? (
          <div>
            {console.log(getSelectedArray())}
            <MultiSelect
              options={props.field.options.map((option) => ({
                label: option,
                value: option,
              }))}
              value={selected}
              onChange={setSelected}
              labelledBy="Select"
              hasSelectAll={false}
            />
          </div>
        ) : (
          []
        )}
      </div>
    </React.Fragment>
  );
}
