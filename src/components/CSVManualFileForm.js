import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";
import ReactApexChart from "react-apexcharts";

const CSVFileForm = ({ project }) => {
  console.log(project);

  const [csvData, setCSVData] = useState([]);
  const [minMaxValues, setMinMaxValues] = useState({
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
    minZ: 0,
    maxZ: 0,
  });
  const [manualMinMaxData, setManualMinMaxData] = useState([]);
  const [manualX, setManualX] = useState("");

  const [manualY, setManualY] = useState("");
  const [manualZ, setManualZ] = useState("");

  const [addingManualMinMax, setAddingManualMinMax] = useState(false);
  const navigate = useNavigate();

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const contents = e.target.result;
      const lines = contents.split("\n");
      const data = lines.map((line) => {
        const [kp, x, y, z] = line.split(",").map(parseFloat);
        return { kp, x, y, z };
      });

      const validData = data.filter(
        (entry) =>
          !isNaN(entry.kp) &&
          !isNaN(entry.x) &&
          !isNaN(entry.y) &&
          !isNaN(entry.z)
      );

      if (validData.length > 0) {
        setCSVData(validData);

        const xValues = validData.map((entry) => entry.x);
        const yValues = validData.map((entry) => entry.y);
        const zValues = validData.map((entry) => entry.z);

        setMinMaxValues({
          minX: Math.min(...xValues),
          maxX: Math.max(...xValues),
          minY: Math.min(...yValues),
          maxY: Math.max(...yValues),
          minZ: Math.min(...zValues),
          maxZ: Math.max(...zValues),
        });
      } else {
        alert("No valid data found in the CSV file.");
        setCSVData([]);
      }
    };

    reader.readAsText(file);
  };

  const handleAddManualMinMax = () => {
    const newManualMinMax = {
      MX: manualX,
      MY: manualY,
      MZ: manualZ,
    };
    setManualMinMaxData([...manualMinMaxData, newManualMinMax]);
    setManualX("");
    setManualY("");
    setManualZ("");
  };

  const handleManualMinMaxSubmit = (event) => {
    event.preventDefault();
    const parsedX = parseFloat(manualX);
    const parsedY = parseFloat(manualY);
    const parsedZ = parseFloat(manualZ);
    if (!isNaN(parsedX) && !isNaN(parsedY) && !isNaN(parsedZ)) {
      setMinMaxValues({
        MX: parsedX,
        MY: parsedY,
        MZ: parsedZ,
      });
    } else {
      alert("Are you sure?");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const calculatedManualMinMax = calculateManualMinMax();
    navigate("/result", {
      state: {
        project,
        csvData,
        minMaxValues,
        manualMinMaxData,
        calculatedManualMinMax,
      },
    });
  };
  const calculateManualMinMax = () => {
    const manualXValues = manualMinMaxData.map((data) => parseFloat(data.MX));
    const manualYValues = manualMinMaxData.map((data) => parseFloat(data.MY));
    const manualZValues = manualMinMaxData.map((data) => parseFloat(data.MZ));

    const minManualX = Math.min(...manualXValues);
    const maxManualX = Math.max(...manualXValues);
    const minManualY = Math.min(...manualYValues);
    const maxManualY = Math.max(...manualYValues);
    const minManualZ = Math.min(...manualZValues);
    const maxManualZ = Math.max(...manualZValues);

    return {
      minManualX,
      maxManualX,
      minManualY,
      maxManualY,
      minManualZ,
      maxManualZ,
    };
  };

  const manualMinMax = calculateManualMinMax();

  return (
    <div>
      <h2>Step 2: CSV/Manual File Upload</h2>
      <p>Project Name: {project.projectName}</p>
      <p>Project Description: {project.projectDescription}</p>
      <p>Client: {project.client}</p>
      <p>Contractor: {project.contractor}</p>

      <div className="form-group">
        <label>Upload CSV File:</label>
        <input
          type="file"
          className="form-control-file"
          accept=".csv"
          onChange={handleCSVUpload}
        />
      </div>

      {csvData.length > 0 && (
        <div>
          <h3>CSV Data</h3>
          <div className="d-flex justify-content-between">
            <div>
              <p>
                Min X: {minMaxValues.minX}, Max X: {minMaxValues.maxX}
              </p>
              <p>
                Min Y: {minMaxValues.minY}, Max Y: {minMaxValues.maxY}
              </p>
              <p>
                Min Z: {minMaxValues.minZ}, Max Z: {minMaxValues.maxZ}
              </p>
            </div>
            <div>
              <ReactApexChart
                options={{
                  xaxis: {
                    categories: csvData.map((entry) => entry.kp),
                    type: "numeric",
                    title: {
                      text: "KP",
                    },
                    scrollbar: {
                      enabled: true,
                    },
                  },
                  yaxis: {
                    min: minMaxValues.minX,
                    max: minMaxValues.maxX,
                    title: {
                      text: "X Axis Title",
                    },
                  },
                  chart: {
                    id: "csv-chart",
                    toolbar: {
                      show: true,
                    },
                  },
                  dataLabels: {
                    enabled: true,
                  },
                  stroke: {
                    curve: "smooth",
                    colors: "#FFDF00", // Set line color to red
                  },
                  // markers: {
                  //   size: 6,
                  // },
                  legend: {
                    show: true,
                    position: "top",
                  },
                  title: {
                    text: "CSV Data Chart",
                    align: "center",
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#263238",
                    },
                  },
                }}
                series={[
                  {
                    name: "X",
                    data: csvData.map((entry) => entry.x),
                  },
                ]}
                type="line"
                height={300}
                width={600}
              />
            </div>
          </div>
        </div>
      )}

      {!csvData.length && (
        <div>
          <button
            className="btn btn-primary mt-5"
            onClick={() => setAddingManualMinMax(!addingManualMinMax)}
          >
            {addingManualMinMax ? "Cancel" : "Enter Manual Data"}
          </button>
          {addingManualMinMax && (
            <form onSubmit={handleManualMinMaxSubmit}>
              <div className="form-group">
                <label>X:</label>
                <input
                  type="number"
                  className="form-control"
                  value={manualX}
                  onChange={(e) => setManualX(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Y:</label>
                <input
                  type="number"
                  className="form-control"
                  value={manualY}
                  onChange={(e) => setManualY(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Z:</label>
                <input
                  type="number"
                  className="form-control"
                  value={manualZ}
                  onChange={(e) => setManualZ(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary my-5"
                onClick={handleAddManualMinMax}
              >
                Add Manual Min-Max
              </button>
            </form>
          )}
          {manualMinMaxData.length > 0 && (
            <div>
              <h3>Added Manual Min-Max Sets</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>KP</th>
                    <th> X</th>

                    <th> Y</th>

                    <th> Z</th>
                  </tr>
                </thead>
                <tbody>
                  {manualMinMaxData.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.MX}</td>

                      <td>{data.MY}</td>

                      <td>{data.MZ}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <p>
                  Min Manual X: {manualMinMax.minManualX}, Max Manual X:{" "}
                  {manualMinMax.maxManualX}
                </p>
                <p>
                  Min Manual Y: {manualMinMax.minManualY}, Max Manual Y:{" "}
                  {manualMinMax.maxManualY}
                </p>
                <p>
                  Min Manual Z: {manualMinMax.minManualZ}, Max Manual Z:{" "}
                  {manualMinMax.maxManualZ}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-5">
        <button type="submit" className="btn btn-success">
          Submit CSV Form
        </button>
      </form>
    </div>
  );
};

export default CSVFileForm;
