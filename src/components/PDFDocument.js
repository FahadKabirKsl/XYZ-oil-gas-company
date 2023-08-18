import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { flexDirection: "row" },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    backgroundColor: "#f2f2f2",
    textAlign: "center",
    padding: 5,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    textAlign: "center",
    padding: 5,
  },
});

const PDFDocument = ({
  project,
  csvData,
  minMaxValues,
  manualMinMaxData,
  calculatedManualMinMax,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Project Name: {project.projectName}</Text>
        <Text>Project Description: {project.projectDescription}</Text>
        <Text>Client: {project.client}</Text>
        <Text>Contractor: {project.contractor}</Text>
      </View>

      {csvData.length > 0 && minMaxValues ? (
        <View style={styles.section}>
          <Text>CSV Data:</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>KP</Text>
              <Text style={styles.tableColHeader}>X</Text>
              <Text style={styles.tableColHeader}>Y</Text>
              <Text style={styles.tableColHeader}>Z</Text>
            </View>
            {csvData.map((entry, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableCol}>{entry.kp}</Text>
                <Text style={styles.tableCol}>{entry.x}</Text>
                <Text style={styles.tableCol}>{entry.y}</Text>
                <Text style={styles.tableCol}>{entry.z}</Text>
              </View>
            ))}
          </View>
          <View style={styles.section}>
            <Text>CSV Min-Max Values:</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Axis</Text>
                <Text style={styles.manualTableColHeader}>Min Value</Text>
                <Text style={styles.manualTableColHeader}>Max Value</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCol}>X</Text>
                <Text style={styles.tableCol}>{minMaxValues.minX}</Text>
                <Text style={styles.tableCol}>{minMaxValues.maxX}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCol}>Y</Text>
                <Text style={styles.tableCol}>{minMaxValues.minY}</Text>
                <Text style={styles.tableCol}>{minMaxValues.maxY}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCol}>Z</Text>
                <Text style={styles.tableCol}>{minMaxValues.minZ}</Text>
                <Text style={styles.tableCol}>{minMaxValues.maxZ}</Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.section}>
          <Text>Manual Data:</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>KP</Text>
              <Text style={styles.tableColHeader}>X</Text>
              <Text style={styles.tableColHeader}>Y</Text>
              <Text style={styles.tableColHeader}>Z</Text>
            </View>
            {manualMinMaxData.map((manualentry, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableCol}>{index + 1}</Text>
                <Text style={styles.tableCol}>{manualentry.MX}</Text>
                <Text style={styles.tableCol}>{manualentry.MY}</Text>
                <Text style={styles.tableCol}>{manualentry.MZ}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text>Manual Min-Max Values:</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Axis</Text>
                <Text style={styles.manualTableColHeader}>Min Value</Text>
                <Text style={styles.manualTableColHeader}>Max Value</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCol}>X</Text>
                <Text style={styles.tableCol}>
                  {calculatedManualMinMax.minManualX}
                </Text>
                <Text style={styles.tableCol}>
                  {calculatedManualMinMax.maxManualX}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCol}>Y</Text>
                <Text style={styles.tableCol}>
                  {calculatedManualMinMax.minManualY}
                </Text>
                <Text style={styles.tableCol}>
                  {calculatedManualMinMax.maxManualY}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCol}>Z</Text>
                <Text style={styles.tableCol}>
                  {calculatedManualMinMax.minManualZ}
                </Text>
                <Text style={styles.tableCol}>
                  {calculatedManualMinMax.maxManualZ}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </Page>
  </Document>
);

export default PDFDocument;
