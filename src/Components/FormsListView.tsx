import React, { useState } from "react";
import { useQueryParams, navigate } from "raviger";
import { Link } from "raviger";

import { createNewPreview, getLocalForms } from "../utils/utils";
// loading interfaces
import { formData } from "../types/formData";

// deleting the form from savedForms whoose id is specified
const deleteForm: (id: number) => formData[] = (id: number) => {
  const localForms = getLocalForms();
  const modifiedForms = localForms.filter((form) => form.id !== id);
  localStorage.setItem("savedForms", JSON.stringify(modifiedForms));
  return modifiedForms;
};

export default function FormListView() {
  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState("");
  const [forms, setForms] = useState(() => getLocalForms());

  // deletes the form and updates the savedForm in localStorage
  const deleteLocalForm: (id: number) => void = (id: number) => {
    setForms(deleteForm(id));
  };

  //function to create a preview
  const createPreview = (form: formData) => {
    const newPreview = createNewPreview(form);
    navigate(`/preview/${newPreview.id}`);
  };

  return (
    <div className="p-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery({ search: searchString });
        }}
      >
        <label htmlFor="search">Search</label>
        <input
          name="search"
          value={searchString}
          className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full focus:outline-blue-500 flex-1"
          type="text"
          onChange={(e) => setSearchString(e.target.value)}
        />
      </form>
      {forms ? (
        forms
          .filter((form) =>
            form.title.toLowerCase().includes(search?.toLowerCase() || "")
          )
          .map((form) => (
            <div
              key={form.id}
              className="flex justify-between gap-5 p-4 rounded-lg shadow-md w-auto"
            >
              <div className="font-semibold mr-2">{form.title}</div>
              <div className="flex justify-between">
                <Link
                  href={"/forms/" + form.id}
                  className="bg-green-500 hover:bg-green-700 text-white px-2 py-1  mx-2 font-bold rounded-lg"
                >
                  Edit
                </Link>

                <button
                  onClick={(_) => createPreview(form)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1  mx-2 font-bold rounded-lg"
                >
                  Quiz
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
        <Link
          href="/forms/0"
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 my-4 font-bold rounded-lg w-full text-center"
        >
          Create Form
        </Link>
      </div>
    </div>
  );
}
