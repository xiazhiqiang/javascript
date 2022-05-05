import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/home"));
const Demo1 = lazy(() => import("./pages/demo1"));

export default function App(props) {
  return (
    <Router>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo1" element={<Demo1 />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
