// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import { UploadCloud } from "lucide-react";
// import Sidebar from "../components/Sidebar";
// import ChartSection from "../components/ChartSection";

// const UploadFile = () => {
//   const [fileName, setFileName] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null); // ✅ New
//   const [data, setData] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [xAxis, setXAxis] = useState("");
//   const [yAxis, setYAxis] = useState("");
//   const [chartType, setChartType] = useState("");
//   const [showChart, setShowChart] = useState(false);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const validTypes = [
//         "application/vnd.ms-excel",
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       ];

//       if (!validTypes.includes(file.type)) {
//         alert("Unsupported file type. Please upload a valid .xls or .xlsx file.");
//         return;
//       }

//       setFileName(file.name);
//       setSelectedFile(file); // ✅ Store the file for chart saving

//       const reader = new FileReader();
//       reader.onload = async (evt) => {
//         try {
//           const bstr = evt.target.result;
//           const wb = XLSX.read(bstr, { type: "binary" });
//           const wsname = wb.SheetNames[0];
//           const ws = wb.Sheets[wsname];
//           const jsonData = XLSX.utils.sheet_to_json(ws);
//           setData(jsonData);
//           setColumns(Object.keys(jsonData[0] || {}));

//           const formData = new FormData();
//           formData.append("file", file);
//           const res = await fetch("http://localhost:7000/api/upload", {
//             method: "POST",
//             body: formData,
//           });
//           const responseData = await res.json();
//           if (res.ok) {
//             console.log("File uploaded and stored in DB:", responseData);
//           } else {
//             console.error("Upload failed:", responseData.msg);
//           }
//         } catch (err) {
//           console.error("Error parsing or uploading file:", err);
//           alert("Something went wrong while processing the file.");
//         }
//       };
//       reader.readAsBinaryString(file);
//     }
//   };

//   const handleCreateChart = () => {
//     if (!xAxis || !yAxis || !chartType) {
//       alert("Please select chart type, X, and Y axis");
//       return;
//     }
//     setShowChart(true);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#dbeafe] flex overflow-hidden">
//       <Sidebar />

//       <div className="ml-72 flex-1 p-10 overflow-x-hidden">
//         <div className="bg-white/90 border border-[#4b2e2e]/30 shadow-lg rounded-2xl p-8">
//           <h1 className="text-3xl font-bold text-[#4b2e2e] mb-2">Upload Excel File</h1>
//           <p className="text-gray-600 mb-6">
//             Upload your Excel file to visualize and analyze your data. 
//           </p>

//           {/* Upload Box */}
//           <div className="border-dashed border-2 border-[#4b2e2e] bg-white p-6 rounded-xl text-center">
//             <UploadCloud className="w-10 h-10 text-[#4b2e2e] mx-auto mb-4" />
//             <p className="font-medium text-[#4b2e2e]">Drag & Drop or Click to Upload</p>
//             <p className="text-sm text-gray-500 mb-4">
//               Supported formats: <span className="font-semibold text-[#4b2e2e]">.xlsx, .xls</span>
//             </p>

//             <label
//               htmlFor="file-upload"
//               className="inline-flex items-center gap-2 px-6 py-2 bg-[#4b2e2e] hover:bg-[#361c1c] text-white text-sm font-medium rounded-md cursor-pointer transition-all"
//             >
//               Browse Files
//               <input
//                 id="file-upload"
//                 type="file"
//                 accept=".xlsx, .xls"
//                 className="hidden"
//                 onChange={handleFileChange}
//               />
//             </label>

//             {fileName && (
//               <p className="mt-3 text-sm text-green-600">Selected File: {fileName}</p>
//             )}
//           </div>

//           {/* Data Preview */}
//           {data.length > 0 && (
//             <div className="mt-8">
//               <h2 className="text-xl font-semibold text-[#4b2e2e] mb-4">Data Preview</h2>

//               <div className="border rounded-xl bg-white shadow-inner overflow-x-auto max-h-[400px]">
//                 <table className="min-w-[1000px] w-full text-sm text-left border-collapse">
//                   <thead className="bg-[#f3e6dc] text-[#4b2e2e] sticky top-0 z-10">
//                     <tr>
//                       {columns.map((col, idx) => (
//                         <th
//                           key={col}
//                           className="px-4 py-2 border-b border-[#e0d6cd] whitespace-nowrap font-semibold"
//                           style={{ display: idx < 5 ? "table-cell" : "table-cell" }}
//                         >
//                           {col}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody className="overflow-y-auto">
//                     {data.map((row, i) => (
//                       <tr key={i} className="hover:bg-[#fdf7f3] border-b last:border-none">
//                         {columns.map((col, idx) => (
//                           <td
//                             key={col}
//                             className="px-4 py-2 text-[#333] border-b border-[#f0eae3] whitespace-nowrap"
//                             style={{ display: idx < 5 ? "table-cell" : "table-cell" }}
//                           >
//                             {row[col]}
//                           </td>
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Chart Config */}
//               <div className="mt-6">
//                 <h2 className="text-xl font-semibold text-[#4b2e2e] mb-2">Chart Configuration</h2>
//                 <div className="flex flex-col sm:flex-row gap-4 mb-4">
//                   <div>
//                     <label className="block text-sm font-medium text-[#4b2e2e] mb-1">Select X-Axis</label>
//                     <select
//                       className="border rounded px-3 py-2 w-full"
//                       value={xAxis}
//                       onChange={(e) => setXAxis(e.target.value)}
//                     >
//                       <option value="">--Select--</option>
//                       {columns.map((col) => (
//                         <option key={col} value={col}>
//                           {col}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-[#4b2e2e] mb-1">Select Y-Axis</label>
//                     <select
//                       className="border rounded px-3 py-2 w-full"
//                       value={yAxis}
//                       onChange={(e) => setYAxis(e.target.value)}
//                     >
//                       <option value="">--Select--</option>
//                       {columns.map((col) => (
//                         <option key={col} value={col}>
//                           {col}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 {/* Chart Type Selector */}
//                 <div className="mt-4 mb-6">
//                   <label className="block text-sm font-medium text-[#4b2e2e] mb-1">Select Chart Type</label>
//                   <select
//                     className="border rounded px-3 py-2 w-full"
//                     value={chartType}
//                     onChange={(e) => setChartType(e.target.value)}
//                   >
//                     <option value="">--Select--</option>
//                     <option value="column">Bar Chart (2D)</option>
//                     <option value="line">Line Chart</option>
//                     <option value="pie">Pie Chart</option>
//                     <option value="donut">Donut Chart</option>
//                     <option value="3d-pie">3D Pie Chart</option>
//                     <option value="3d-column">3D Column Chart</option>
//                     <option value="3d-line">3D Line Chart</option>
//                   </select>
//                 </div>

//                 <button
//                   onClick={handleCreateChart}
//                   className="bg-[#4b2e2e] hover:bg-[#361c1c] text-white px-6 py-2 rounded shadow"
//                 >
//                   Create Chart
//                 </button>
//               </div>

//               {/* Chart Section */}
//               {showChart && (
//                 <ChartSection
//                   chartType={chartType}
//                   xAxis={xAxis}
//                   yAxis={yAxis}
//                   data={data}
//                   selectedFile={selectedFile} // ✅ File passed here
//                 />
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadFile;


import React, { useState } from "react";
import * as XLSX from "xlsx";
import { UploadCloud } from "lucide-react";
import Sidebar from "../components/Sidebar";
import ChartSection from "../components/ChartSection";
import { useFileContext } from "../context/FileContext";

const UploadFile = () => {
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [chartType, setChartType] = useState("");
  const [showChart, setShowChart] = useState(false);

  const { setUploadedFiles } = useFileContext();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];

      if (!validTypes.includes(file.type)) {
        alert("Unsupported file type. Please upload a valid .xls or .xlsx file.");
        return;
      }

      setFileName(file.name);
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = async (evt) => {
        try {
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const jsonData = XLSX.utils.sheet_to_json(ws);
          setData(jsonData);
          setColumns(Object.keys(jsonData[0] || {}));

          // ✅ Upload to backend with file name
          const formData = new FormData();
          formData.append("file", file);
          formData.append("originalname", file.name); // ✅ send filename explicitly

          const res = await fetch("http://localhost:7000/api/upload", {
            method: "POST",
            body: formData,
          });

          const responseData = await res.json();
          if (res.ok) {
            console.log("File uploaded and stored in DB:", responseData);
            setUploadedFiles((prev) => [...prev, responseData]);
          } else {
            console.error("Upload failed:", responseData.msg);
          }
        } catch (err) {
          console.error("Error parsing or uploading file:", err);
          alert("Something went wrong while processing the file.");
        }
      };

      reader.readAsBinaryString(file);
    }
  };

  const handleCreateChart = () => {
    if (!xAxis || !yAxis || !chartType) {
      alert("Please select chart type, X, and Y axis");
      return;
    }
    setShowChart(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#dbeafe] flex overflow-hidden">
      <Sidebar />

      <div className="ml-72 flex-1 p-10 overflow-x-hidden">
        <div className="bg-white/90 border border-[#4b2e2e]/30 shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-[#4b2e2e] mb-2">Upload Excel File</h1>
          <p className="text-gray-600 mb-6">
            Upload your Excel file to visualize and analyze your data.
          </p>

          {/* Upload Box */}
          <div className="border-dashed border-2 border-[#4b2e2e] bg-white p-6 rounded-xl text-center">
            <UploadCloud className="w-10 h-10 text-[#4b2e2e] mx-auto mb-4" />
            <p className="font-medium text-[#4b2e2e]">Drag & Drop or Click to Upload</p>
            <p className="text-sm text-gray-500 mb-4">
              Supported formats: <span className="font-semibold text-[#4b2e2e]">.xlsx, .xls</span>
            </p>

            <label
              htmlFor="file-upload"
              className="inline-flex items-center gap-2 px-6 py-2 bg-[#4b2e2e] hover:bg-[#361c1c] text-white text-sm font-medium rounded-md cursor-pointer transition-all"
            >
              Browse Files
              <input
                id="file-upload"
                type="file"
                accept=".xlsx, .xls"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {fileName && (
              <p className="mt-3 text-sm text-green-600">Selected File: {fileName}</p>
            )}
          </div>

          {/* Data Preview */}
          {data.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-[#4b2e2e] mb-4">Data Preview</h2>

              <div className="border rounded-xl bg-white shadow-inner overflow-x-auto max-h-[400px]">
                <table className="min-w-[1000px] w-full text-sm text-left border-collapse">
                  <thead className="bg-[#f3e6dc] text-[#4b2e2e] sticky top-0 z-10">
                    <tr>
                      {columns.map((col, idx) => (
                        <th
                          key={col}
                          className="px-4 py-2 border-b border-[#e0d6cd] whitespace-nowrap font-semibold"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, i) => (
                      <tr key={i} className="hover:bg-[#fdf7f3] border-b last:border-none">
                        {columns.map((col) => (
                          <td
                            key={col}
                            className="px-4 py-2 text-[#333] border-b border-[#f0eae3] whitespace-nowrap"
                          >
                            {row[col]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Chart Config */}
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-[#4b2e2e] mb-2">Chart Configuration</h2>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#4b2e2e] mb-1">
                      Select X-Axis
                    </label>
                    <select
                      className="border rounded px-3 py-2 w-full"
                      value={xAxis}
                      onChange={(e) => setXAxis(e.target.value)}
                    >
                      <option value="">--Select--</option>
                      {columns.map((col) => (
                        <option key={col} value={col}>
                          {col}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4b2e2e] mb-1">
                      Select Y-Axis
                    </label>
                    <select
                      className="border rounded px-3 py-2 w-full"
                      value={yAxis}
                      onChange={(e) => setYAxis(e.target.value)}
                    >
                      <option value="">--Select--</option>
                      {columns.map((col) => (
                        <option key={col} value={col}>
                          {col}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Chart Type Selector */}
                <div className="mt-4 mb-6">
                  <label className="block text-sm font-medium text-[#4b2e2e] mb-1">
                    Select Chart Type
                  </label>
                  <select
                    className="border rounded px-3 py-2 w-full"
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value)}
                  >
                    <option value="">--Select--</option>
                    <option value="column">Bar Chart (2D)</option>
                    <option value="line">Line Chart</option>
                    <option value="pie">Pie Chart</option>
                    <option value="donut">Donut Chart</option>
                    <option value="3d-pie">3D Pie Chart</option>
                    <option value="3d-column">3D Column Chart</option>
                    <option value="3d-line">3D Line Chart</option>
                  </select>
                </div>

                <button
                  onClick={handleCreateChart}
                  className="bg-[#4b2e2e] hover:bg-[#361c1c] text-white px-6 py-2 rounded shadow"
                >
                  Create Chart
                </button>
              </div>

              {/* Chart Section */}
              {showChart && (
                <ChartSection
                  chartType={chartType}
                  xAxis={xAxis}
                  yAxis={yAxis}
                  data={data}
                  selectedFile={selectedFile}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
