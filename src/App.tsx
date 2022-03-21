import React from "react";
import Header from "./Components/Header";
import AppContainer from "./Components/AppContainer";
import FormField from "./Components/FormField";

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
          <FormField field={field} />
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
