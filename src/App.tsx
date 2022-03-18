import React from "react";
import Header from "./Header";
import AppContainer from "./AppContainer";

const formFields = [
  { id: 1, label: "First Name", input: "text" },
  { id: 2, label: "Last Name", input: "text" },
  { id: 3, label: "Email ", input: "text" },
  // { id: 4, label: "Phone Number ", input: "text" },
  // { id: 5, label: "Date of Birth", input: "text" },
];

function App() {
  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header
          title={"Welcome to Lesson 5 of $react-typescript with #tailwind"}
        />
        {formFields.map((field) => (
          <React.Fragment key={field.id}>
            <label className="m-2" htmlFor="">
              {field.label}
            </label>
            <input
              className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
              type="text"
            />
          </React.Fragment>
        ))}
      </div>
    </AppContainer>
  );
}

export default App;
