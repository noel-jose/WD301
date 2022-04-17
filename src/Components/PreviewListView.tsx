import React, { useState } from "react";
import { useQueryParams, navigate } from "raviger";
import { Link } from "raviger";

import { getLocalPreview } from "../utils/utils";
// loading interfaces

import { previewData } from "../types/previewData";

// deleting the preview form saved Previews
const deletePreview: (id: number) => previewData[] = (id: number) => {
  const localPreviews = getLocalPreview();
  const modifiedPreviews = localPreviews.filter((preview) => preview.id !== id);
  localStorage.setItem("savedPreviews", JSON.stringify(modifiedPreviews));
  return modifiedPreviews;
};

export default function PreviewListView() {
  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState("");
  const [previews, setPreview] = useState(() => getLocalPreview());

  // deletes the form and updates the savedForm in localStorage
  const deleteLocalPreview: (id: number) => void = (id: number) => {
    setPreview(deletePreview(id));
    return navigate("/submissions");
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
      {previews ? (
        previews
          .filter((preview) =>
            preview.title.toLowerCase().includes(search?.toLowerCase() || "")
          )
          .map((preview) => (
            <div
              key={preview.id}
              className="flex justify-between gap-5 p-4 rounded-lg shadow-md w-auto"
            >
              <Link
                className="font-semibold mr-2"
                href={`/preview/${preview.id}`}
              >
                {preview.title}
              </Link>
              <div className="flex justify-between">
                <button
                  onClick={(_) => deleteLocalPreview(preview.id)}
                  className="bg-red-500 hover:bg-red-700 text-white  px-2 py-1 mx-2 font-bold rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
      ) : (
        <p>No Previews</p>
      )}
    </div>
  );
}
