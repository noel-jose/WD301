import React, { useState } from "react";
import Header from "./Components/Header";
import AppContainer from "./Components/AppContainer";
import Form from "./Components/Form";
import Home from "./Components/Home";
import FormListView from "./Components/FormsListView";

function App() {
  const [state, setState] = useState(-1);

  const openForm = (id: number) => {
    setState(id);
  };

  const closeForm = () => {
    setState(-1);
  };

  return (
    <AppContainer>
      <div className="p-4 mx-96 bg-white shadow-lg rounded-xl">
        <Header title={"React Forms"} />
        {state === -1 ? (
          <FormListView openFormCB={openForm} />
        ) : (
          <Form formId={state} closeFormCB={closeForm} />
        )}
        {/* <FormListView /> */}
      </div>
    </AppContainer>
  );
}

export default App;
