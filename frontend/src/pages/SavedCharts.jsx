import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import Sidebar from "../components/Sidebar";

const SavedCharts = () => {
  const [charts, setCharts] = useState([]);

  useEffect(() => {
    fetchCharts();
  }, []);

  const fetchCharts = () => {
    fetch("http://localhost:7000/api/charts/all")
      .then((res) => res.json())
      .then((data) => setCharts(data))
      .catch(() => alert("Failed to load saved charts."));
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this chart?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:7000/api/charts/delete/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message || "Chart deleted");
        fetchCharts(); // Refresh
      } else {
        alert("Delete failed.");
      }
    } catch (err) {
      alert("Error deleting chart.");
    }
  };

  const renderChart = (chart) => {
    const chartData = {
      labels: chart.labels,
      datasets: [
        {
          label: chart.yAxis,
          data: chart.values,
          backgroundColor: chart.labels.map(
            (_, i) => `hsl(${(i * 360) / chart.labels.length}, 70%, 60%)`
          ),
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };

    switch (chart.chartType) {
      case "line":
        return <Line data={chartData} options={options} />;
      case "column":
        return <Bar data={chartData} options={options} />;
      case "pie":
        return <Pie data={chartData} options={options} />;
      case "donut":
        return <Doughnut data={chartData} options={options} />;
      case "3d-pie":
        return (
          <Plot
            data={[
              {
                type: "pie",
                labels: chart.labels,
                values: chart.values,
                marker: {
                  colors: chart.labels.map(
                    (_, i) => `hsl(${(i * 360) / chart.labels.length}, 70%, 60%)`
                  ),
                },
              },
            ]}
            layout={{
              title: "3D Pie Chart",
              width: 280,
              height: 250,
              margin: { t: 30, l: 20, r: 20, b: 20 },
            }}
          />
        );
      case "3d-column":
        return (
          <Plot
            data={[
              {
                type: "bar",
                x: chart.labels,
                y: chart.values,
                marker: {
                  color: chart.labels.map(
                    (_, i) => `hsl(${(i * 360) / chart.labels.length}, 70%, 60%)`
                  ),
                },
              },
            ]}
            layout={{
              title: "3D Column Chart",
              width: 280,
              height: 250,
              margin: { t: 30, l: 20, r: 20, b: 20 },
            }}
          />
        );
      default:
        return <p className="text-red-600">Unsupported chart type</p>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#3d51ae] via-[#7492e8] to-[#eceef0] text-white">
      <Sidebar />

      <main className="flex-1 ml-72 p-10 overflow-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-white drop-shadow">
           My Saved Charts
        </h2>

        {charts.length === 0 ? (
          <p className="text-center text-gray-300 text-lg">No saved charts found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {charts.map((chart) => (
              <div
                key={chart._id}
                className="bg-white text-gray-800 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4 relative"
              >
                <div className="h-[250px] mb-2">{renderChart(chart)}</div>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-semibold">Chart Type:</span>{" "}
                    {chart.chartType?.toUpperCase()}
                  </p>
                  <p>
                    <span className="font-semibold">Excel File:</span>{" "}
                    {chart.fileName || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">X-Axis:</span> {chart.xAxis}
                  </p>
                  <p>
                    <span className="font-semibold">Y-Axis:</span> {chart.yAxis}
                  </p>
                  <p className="text-xs text-gray-500">
                    Saved on: {new Date(chart.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(chart._id)}
                  className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded shadow transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SavedCharts;
