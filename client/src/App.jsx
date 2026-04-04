import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import LogIn from "./pages/LogIn";
import Signup from "./pages/Signup";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<LogIn />} />
      <Route path="/register" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;