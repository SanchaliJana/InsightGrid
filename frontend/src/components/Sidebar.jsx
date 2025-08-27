// import { useEffect, useState } from "react";
// import { FileText } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const Sidebar = ({ uploadedFiles = [] }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setIsOpen(true);
//   }, []);

//   return (
//     <aside
//       className={`absolute top-[64px] left-0 h-[calc(100vh-64px)] w-72 bg-gradient-to-b from-[#4b2e2e] to-[#2f1a12] text-white p-6 shadow-xl z-40 transform transition-transform duration-500 ease-in-out ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       } rounded-tr-3xl rounded-br-3xl overflow-y-auto`}
//     >
//       {/* Uploaded Excel Files */}
//       <div className="mb-8">
//         <h2 className="text-lg font-bold mb-2">Uploaded Excel Files</h2>
//         {uploadedFiles.length === 0 ? (
//           <p className="text-white/70 text-sm">No files uploaded</p>
//         ) : (
//           <ul className="space-y-1 text-sm">
//             {uploadedFiles.map((file) => (
//               <li
//                 key={file._id}
//                 className="flex items-center justify-between bg-white/10 hover:bg-white/20 px-3 py-1 rounded"
//               >
//                 {file.fileName}
//                 <FileText className="w-4 h-4 opacity-70" />
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Tools Section below */}
//       <div className="mt-8">
//         <h2 className="text-lg font-bold mb-3">Tools</h2>
//         <div className="space-y-3">
//           <button
//             onClick={() => navigate("/dashboard/uploadfile")}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl shadow transition-all"
//           >
//             Upload New File
//           </button>
//           <button
//             onClick={() => navigate("/dashboard/charts")}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl shadow transition-all"
//           >
//             View My Charts
//           </button>
//           <button
//             onClick={() => navigate("/dashboard/report")}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl shadow transition-all"
//           >
//             Generate Report
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <aside
      className={`absolute top-[64px] left-0 h-[calc(100vh-64px)] w-72 bg-gradient-to-b from-[#4b2e2e] to-[#2f1a12] text-white p-6 shadow-xl z-40 transform transition-transform duration-500 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } rounded-tr-3xl rounded-br-3xl overflow-y-auto`}
    >
      {/* Tools Section */}
      <div>
        <h2 className="text-lg font-bold mb-3">Tools</h2>
        <div className="space-y-3">
          <button
            onClick={() => navigate("/dashboard/uploadfile")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl shadow transition-all"
          >
            Upload New File
          </button>
          <button
            onClick={() => navigate("/dashboard/charts")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl shadow transition-all"
          >
            View My Charts
          </button>
          <button
            onClick={() => navigate("/dashboard/report")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl shadow transition-all"
          >
            Generate Report
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
