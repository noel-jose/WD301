import React, { useState } from "react";
import Header from "./Components/Header";
import AppContainer from "./Components/AppContainer";
import Form from "./Components/Form";
import Home from "./Components/Home";

function App() {
  const [state, setState] = useState("HOME");

  const openForm = () => {
    setState("FORM");
  };

  const closeForm = () => {
    setState("HOME");
  };

  return (
    <AppContainer>
      <div className="p-4 mx-96 bg-white shadow-lg rounded-xl">
        <Header
          title={"Welcome to Lesson 5 of $react-typescript with #tailwind"}
        />
        {state === "HOME" ? (
          <Home openFormCB={openForm} />
        ) : (
          <Form closeFormCB={closeForm} />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
