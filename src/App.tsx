import React from "react";
import Header from "./Components/Header";
import AppContainer from "./Components/AppContainer";

const formFields = [
  { id: 1, label: "First Name", input: "text" },
  { id: 2, label: "Last Name", input: "text" },
  { id: 3, label: "Email ", input: "email" },
  { id: 4, label: "Phone Number ", input: "number" },
  { id: 5, label: "Date of Birth", input: "date" },
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
              className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full focus:outline-blue-500"
              type={field.input}
            />
          </React.Fragment>
        ))}
        <input
          className="bg-blue-500 px-3 py-2 rounded-md text-white font-semibold m-2"
          type="submit"
        />
      </div>
    </AppContainer>
  );
}

export default App;
