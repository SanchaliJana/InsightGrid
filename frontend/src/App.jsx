import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadFile from "./pages/UploadFile"; 
import Layout from "./components/Layout";
import SavedCharts from "./pages/SavedCharts";
import ViewMyReportPage from "./pages/ViewMyReportPage";
function App() {
  return (
    <Router>
      <Routes>
        {/* Routes wrapped with Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/uploadfile" element={<UploadFile />} /> 
          <Route path="/dashboard/charts" element={<SavedCharts />} />
          <Route path="/dashboard/report" element={<ViewMyReportPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
