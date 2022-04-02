import React from "react";
import Header from "./Header";

export default function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 items-center justify-center">
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header title={"React Forms"} />
        {props.children}
      </div>
    </div>
  );
}
