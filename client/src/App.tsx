import React from "react";
import "./App.css";
import { Layout } from "./layout/Layout";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Layout /> */}
      <BrowserRouter>
        <Routes>
          <Route path="*" />
        </Routes>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;
