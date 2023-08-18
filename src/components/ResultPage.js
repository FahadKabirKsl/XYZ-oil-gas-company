import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import PDFDocument from "./PDFDocument";

const ResultPage = () => {
  const location = useLocation();
  const state = location.state;

  if (!state) {
    return <div>No data available</div>;
  }

  const {
    project,
    csvData,
    minMaxValues,
    manualMinMaxData,
    calculatedManualMinMax,
  } = state;
  console.log(project);
  console.log(csvData);
  console.log(minMaxValues);
  console.log(calculatedManualMinMax);
  return (
    <div>
      <h2>Result Page</h2>
      <h3>Project Details</h3>
      <table className="table">
        <tbody>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>Project Name</td>
            <td>{project.projectName}</td>
          </tr>
          <tr>
            <td>Project Description</td>
            <td>{project.projectDescription}</td>
          </tr>
          <tr>
            <td>Client</td>
            <td>{project.client}</td>
          </tr>
          <tr>
            <td>Contractor</td>
            <td>{project.contractor}</td>
          </tr>
        </tbody>
      </table>
      {csvData.length > 0 ? (
        <>
          <h3>CSV Data</h3>
          <div className="h-25 table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>KP</th>
                  <th>X</th>
                  <th>Y</th>
                  <th>Z</th>
                </tr>
              </thead>
              <tbody>
                {csvData.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.kp}</td>
                    <td>{entry.x}</td>
                    <td>{entry.y}</td>
                    <td>{entry.z}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <h3>Manual Min-Max Values</h3>
          <table className="table">
            <thead>
              <tr>
                <th>KP</th>
                <th>X</th>

                <th>Y</th>

                <th>Z</th>
              </tr>
            </thead>
            <tbody>
              {manualMinMaxData.map((data, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{data.MX}</td>
                  <td>{data.MY}</td>
                  <td>{data.MZ}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {csvData.length > 0 && (
        <div>
          <h3>Min and Max Values</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Axis</th>
                <th>Min Value</th>
                <th>Max Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>X</td>
                <td>{minMaxValues.minX}</td>
                <td>{minMaxValues.maxX}</td>
              </tr>
              <tr>
                <td>Y</td>
                <td>{minMaxValues.minY}</td>
                <td>{minMaxValues.maxY}</td>
              </tr>
              <tr>
                <td>Z</td>
                <td>{minMaxValues.minZ}</td>
                <td>{minMaxValues.maxZ}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {manualMinMaxData.length > 0 && (
        <div>
          <h3> Manual Min and Max Values</h3>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>Axis</th>
                  <th>Min Value</th>
                  <th>Max Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>X</td>
                  <td>{calculatedManualMinMax.minManualX}</td>
                  <td>{calculatedManualMinMax.maxManualX}</td>
                </tr>
                <tr>
                  <td>Y</td>
                  <td>{calculatedManualMinMax.minManualY}</td>
                  <td>{calculatedManualMinMax.maxManualY}</td>
                </tr>
                <tr>
                  <td>Z</td>
                  <td>{calculatedManualMinMax.minManualZ}</td>
                  <td>{calculatedManualMinMax.maxManualZ}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      <PDFDownloadLink
        document={
          <PDFDocument
            project={project}
            csvData={csvData}
            minMaxValues={minMaxValues}
            manualMinMaxData={manualMinMaxData}
            calculatedManualMinMax={calculatedManualMinMax}
          />
        }
        fileName="result.pdf"
      >
        {({ loading }) =>
          loading ? (
            "Generating PDF..."
          ) : (
            <button className="btn btn-primary">Download PDF</button>
          )
        }
      </PDFDownloadLink>

      <div className="my-5">
        <Link to="/">
          <button className="btn btn-warning text-white">Back to home</button>
        </Link>
      </div>
    </div>
  );
};

export default ResultPage;
