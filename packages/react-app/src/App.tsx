import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Demo1 from "./pages/demo1";

export default function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/demo1" element={<Demo1 />} />
      </Routes>
    </BrowserRouter>
  );
}
