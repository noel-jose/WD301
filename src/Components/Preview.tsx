import React, { useState, useEffect } from "react";
import PreviewField from "./PreviewField";
import { getLocalPreview, saveLocalPreview } from "../utils/utils";

import { Link } from "raviger";
import { navigate } from "raviger";

// loading of interfaces

import previewData from "../Interfaces/previewData";

const initializePreview = (previewId: number) => {
  const localPreviews = getLocalPreview();
  return localPreviews.filter((preview) => preview.id === previewId)[0];
};

const savePreview: (currentState: previewData) => void = (currentState) => {
  const localPreviews = getLocalPreview();
  const updatedLocalPreviews = localPreviews.map((preview) =>
    preview.id === currentState.id ? currentState : preview
  );
  saveLocalPreview(updatedLocalPreviews);
};

export default function Preview(props: {
  previewId: number;
  questionId: number;
}) {
  const [state, setState] = useState(() => initializePreview(props.previewId));

  useEffect(() => {
    const timeout = setTimeout(() => {
      savePreview(state);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  // function to change the question in a quiz
  const changeField = (id: number, value: string) => {
    setState({
      ...state,
      fields: state.fields.map((field) => {
        if (field.id === id) {
          return { ...field, value: value };
        }
        return field;
      }),
    });
  };

  const submitForm = () => {
    setState({ ...state, submitted: true });
    savePreview(state);
    return navigate("/preview/0");
  };

  return (
    <div>
      <div className="flex flex-col gap-2 p-4 divide-y-2 divide-dotted">
        <div>
          <h1 className="text-xl font-semibold">{state.title}</h1>
        </div>
        <div>
          {state.fields.length === 0 ? (
            <div>No Questions</div>
          ) : (
            <div>
              {state.submitted === true ? (
                <div>
                  {state.fields.map((field) => (
                    <div key={field.id}>
                      <h1>{field.label}</h1>
                      <input
                        className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full "
                        type="text"
                        value={field.value}
                        disabled
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {state.fields
                    .filter((field) => field.id === props.questionId)
                    .map((field) => (
                      <div key={field.id}>
                        <PreviewField
                          key={field.id}
                          field={field}
                          changeFieldCB={changeField}
                        />

                        <div className="flex justify-between">
                          {props.questionId === 0 ? (
                            <div></div>
                          ) : (
                            <Link
                              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 my-4 font-bold rounded-lg"
                              href={`/preview/${state.id}/${
                                props.questionId - 1
                              }`}
                            >
                              Previous
                            </Link>
                          )}
                          {props.questionId !== state.fields.length - 1 ? (
                            <Link
                              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 my-4 font-bold rounded-lg"
                              href={`/preview/${state.id}/${
                                props.questionId + 1
                              }`}
                            >
                              Next
                            </Link>
                          ) : (
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 my-4 font-bold rounded-lg"
                              onClick={(_) => submitForm()}
                            >
                              Submit
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
