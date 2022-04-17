import React, { useState } from "react";
import { formField, formFieldType } from "../types/formField";

export default function MultipleInput(props: {
  field: {
    kind: formFieldType;
    id: number;
    label: string;
    options: string[];
    value: string;
  };
  removeFieldCB: (id: number) => void;
  changeFieldCB: (key: number, value: string) => void;
  updateOptionsCB: (id: number, index: number, value: string) => void;
  deleteOptionsCB: (id: number, index: number) => void;
}) {
  const [option, setOption] = useState("");
  return (
    <React.Fragment>
      <div className="flex gap-2 ">
        <div className="flex-1 " key={props.field.id}>
          <div className="">
            <div className="flex gap-2">
              <input
                className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
                type="text"
                value={props.field.label}
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
            <div className="ml-5">
              <label>Options for {props.field.label}:</label>
              {props.field.options.map((option, index) => (
                <div key={index} className="flex">
                  <input
                    value={option}
                    className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full focus:outline-blue-500 flex-1"
                    type="text"
                    onChange={(e) => {
                      console.log(option);
                      props.updateOptionsCB(
                        props.field.id,
                        index,
                        e.target.value
                      );
                    }}
                  />
                  <button
                    onClick={(_) =>
                      props.deleteOptionsCB(props.field.id, index)
                    }
                    className="bg-red-500 hover:bg-red-700 text-white  px-1 py-1 mx-2 font-bold rounded-lg w-auto"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex ml-5">
            <input
              className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
              type="text"
              value={option}
              onChange={(e) => setOption(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 my-4 font-bold rounded-lg"
              onClick={() => {
                props.updateOptionsCB(
                  props.field.id,
                  props.field.options.length,
                  option
                );
                setOption("");
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
