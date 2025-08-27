import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [history, setHistory] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetch("http://localhost:7000/api/upload/upload-history")
      .then((res) => res.json())
      .then(setHistory)
      .catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:7000/api/upload/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setHistory(history.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleView = (data) => {
    setPreviewData(data);
    setShowPreview(true);
  };

  const formatDate = (isoDate) => new Date(isoDate).toLocaleString();
  const formatSize = (bytes) => (bytes / 1024).toFixed(2) + " KB";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#dbeafe]">
      <Sidebar uploadedFiles={history} />

      <div className="ml-72 px-6 py-12 transition-all duration-500 ease-in-out">
        <div className="max-w-7xl mx-auto bg-white/90 rounded-3xl p-10 shadow-xl backdrop-blur-md border border-[#4b2e2e]/30">
          <h1 className="text-4xl font-extrabold mb-10 text-center text-[#4b2e2e]">
            Excel Analytics Dashboard
          </h1>

          <h2 className="text-xl font-semibold mb-4 text-[#4b2e2e]">
            Uploaded Files: {history.length}
          </h2>

          <div className="overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4 text-[#4b2e2e]">
              Upload History
            </h2>
            {history.length === 0 ? (
              <p className="text-[#6b4f4f] italic">No files uploaded yet.</p>
            ) : (
              <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-[#f0e5da] text-[#4b2e2e] uppercase text-sm">
                    <th className="py-3 px-6 text-left">File Name</th>
                    <th className="py-3 px-6 text-left">Uploaded At</th>
                    <th className="py-3 px-6 text-left">File Size</th>
                    <th className="py-3 px-6 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item) => (
                    <tr key={item._id} className="border-b hover:bg-[#fdf6f1]">
                      <td className="py-3 px-6">{item.fileName}</td>
                      <td className="py-3 px-6">{formatDate(item.uploadDate)}</td>
                      <td className="py-3 px-6">{formatSize(item.size)}</td>
                      <td className="py-3 px-6 space-x-2">
                        <button
                          onClick={() => handleView(item.data)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {showPreview && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white max-w-4xl w-full p-6 rounded-lg overflow-auto max-h-[80vh]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Excel File Preview</h3>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="text-red-600 font-bold text-lg"
                  >
                    &times;
                  </button>
                </div>
                {previewData.length === 0 ? (
                  <p>No data found.</p>
                ) : (
                  <table className="w-full text-sm border">
                    <thead>
                      <tr className="bg-gray-200">
                        {Object.keys(previewData[0]).map((key) => (
                          <th className="p-2 border" key={key}>
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          {Object.values(row).map((val, i) => (
                            <td className="p-2 border" key={i}>
                              {val}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
