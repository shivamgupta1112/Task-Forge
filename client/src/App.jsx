import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import LogIn from "./pages/LogIn";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;