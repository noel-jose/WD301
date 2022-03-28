import React from "react";
import logo from "../logo.svg";
export default function Home(props: { openFormCB: () => void }) {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <img className="h-48" src={logo} alt="react-logo" />
        <div className="flex flex-1 justify-center items-center">
          <p>Welcome to the home page</p>
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 my-4 font-bold rounded-lg"
        onClick={props.openFormCB}
      >
        Open Form
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 my-4 font-bold rounded-lg"
        onClick={props.openFormCB}
      >
        Open Form
      </button>
    </div>
  );
}
