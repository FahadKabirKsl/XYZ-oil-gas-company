import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ProjectNameForm from "./components/ProjectNameForm";
import CSVManualFileForm from "./components/CSVManualFileForm";
import ResultPage from "./components/ResultPage";

function App() {
  const [project, setProject] = useState(null);

  const handleNextStep = (projectData) => {
    setProject(projectData);
  };

  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route
            path="/"
            element={<ProjectNameForm onNext={handleNextStep} />}
          />
          <Route
            path="/csv"
            element={<CSVManualFileForm project={project} />}
          />
          <Route path="/result" element={<ResultPage project={project} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
