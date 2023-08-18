import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectNameForm = ({ onNext }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [client, setClient] = useState("");
  const [contractor, setContractor] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
      projectName,
      projectDescription,
      client,
      contractor,
    };
    onNext(projectData);
    navigate("/csv");
  };

  return (
    <div>
      <h2>Step 1: Project Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project Name:</label>
          <input
            type="text"
            className="form-control"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Project Description:</label>
          <input
            type="text"
            className="form-control"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Client:</label>
          <input
            type="text"
            className="form-control"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contractor:</label>
          <input
            type="text"
            className="form-control"
            value={contractor}
            onChange={(e) => setContractor(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Next
        </button>
      </form>
    </div>
  );
};

export default ProjectNameForm;
