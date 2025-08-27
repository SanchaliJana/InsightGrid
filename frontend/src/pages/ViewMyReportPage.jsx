import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Sidebar from "../components/Sidebar";

const ViewMyReportPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeFiles, setIncludeFiles] = useState(true);
  const [notes, setNotes] = useState("");
  const [savedCharts, setSavedCharts] = useState([]);
  const reportRef = useRef();

  // Fetch uploaded files
  useEffect(() => {
    fetch("http://localhost:7000/api/files")
      .then((res) => res.json())
      .then((data) => setUploadedFiles(data))
      .catch((err) => console.error("Error fetching files:", err));
  }, []);

  // Fetch saved charts for selected file
  useEffect(() => {
    const file = uploadedFiles.find((f) => f._id === selectedFileId);
    if (!file) return;

    setSelectedFileName(file.fileName);

    fetch(`http://localhost:7000/api/charts/saved?fileName=${file.fileName}`)
      .then((res) => res.json())
      .then((data) => setSavedCharts(data))
      .catch((err) => console.error("Error fetching saved charts:", err));
  }, [selectedFileId, uploadedFiles]);

  const generatePDF = async () => {
    const input = reportRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("report.pdf");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 text-white">
      <Sidebar />
      <div className="flex-1 ml-80 px-10 py-8">
        <h1 className="text-3xl font-bold mb-6">📄 Generate Report</h1>

        {/* Customization Panel */}
        <div className="bg-[#342d2a]/90 p-6 rounded-2xl shadow-xl mb-6 max-w-5xl mx-auto space-y-5">
          <h2 className="text-xl font-semibold">Customize Report</h2>

          <div>
            <label className="block mb-1 font-medium">Select File:</label>
            <select
              className="w-full text-black p-2 rounded-md"
              value={selectedFileId}
              onChange={(e) => setSelectedFileId(e.target.value)}
            >
              <option value="">-- Select Excel File --</option>
              {uploadedFiles.map((file) => (
                <option key={file._id} value={file._id}>
                  {file.fileName}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeFiles}
                onChange={() => setIncludeFiles(!includeFiles)}
              />
              Include Uploaded Files
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeCharts}
                onChange={() => setIncludeCharts(!includeCharts)}
              />
              Include Saved Charts
            </label>
          </div>

          <textarea
            className="w-full p-3 rounded-lg text-black"
            rows="3"
            placeholder="Add your notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        {/* Report Preview */}
        <div
          ref={reportRef}
          className="bg-white text-black p-8 rounded-xl shadow-xl mb-8 max-w-5xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-900">
            📘 Excel Analytics Report
          </h2>

          {includeFiles && selectedFileName && (
            <div className="mb-4">
              <h3 className="font-semibold">Selected File:</h3>
              <p className="text-gray-700 text-sm">{selectedFileName}</p>
            </div>
          )}

          {includeCharts && savedCharts.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Saved Charts:</h3>
              <div className="grid grid-cols-2 gap-6">
                {savedCharts.map((chart, index) => (
                  <div key={index} className="p-4 bg-gray-100 rounded-lg shadow">
                    <img
                      src={chart.imageBase64}
                      alt={chart.chartType}
                      className="rounded w-full h-auto mb-2"
                    />
                    <p className="text-sm text-gray-800">
                      <strong>Chart Type:</strong> {chart.chartType}
                    </p>
                    <p className="text-sm text-gray-800">
                      <strong>X Axis:</strong> {chart.xAxis}
                    </p>
                    <p className="text-sm text-gray-800">
                      <strong>Y Axis:</strong> {chart.yAxis}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {notes && (
            <div className="mt-4">
              <h3 className="font-semibold">Notes:</h3>
              <p className="text-sm text-gray-700">{notes}</p>
            </div>
          )}
        </div>

        {/* Download Button */}
        <div className="text-center">
          <button
            onClick={generatePDF}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white font-semibold rounded-lg shadow transition-all"
          >
            📥 Download Report as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewMyReportPage;
