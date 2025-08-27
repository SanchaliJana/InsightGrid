import React, { useRef, useState } from "react";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  LineController,
  BarController,
  PieController,
  DoughnutController,
} from "chart.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Plot from "react-plotly.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  LineController,
  BarController,
  PieController,
  DoughnutController
);

const ChartSection = ({ data, xAxis, yAxis, chartType, selectedFile, zAxis }) => {
  const chartRef = useRef();
  const [summary, setSummary] = useState("");
  const [saving, setSaving] = useState(false);
  const [summarizing, setSummarizing] = useState(false);

  if (!xAxis || !yAxis || !data || data.length === 0) {
    return <div className="text-red-500">No data available to generate chart.</div>;
  }

  const xValues = data.map((row) => row?.[xAxis] ?? "Unknown");
  const yValues = data.map((row) => parseFloat(row?.[yAxis]) || 0);
  const zValues = zAxis ? data.map((row) => parseFloat(row?.[zAxis]) || 0) : yValues.map((_, i) => i);

  const backgroundColors = xValues.map(
    (_, i) => `hsl(${(i * 360) / xValues.length}, 70%, 60%)`
  );

  const chartData = {
    labels: xValues,
    datasets: [
      {
        label: yAxis,
        data: yValues,
        backgroundColor: chartType === "line" ? "transparent" : backgroundColors,
        borderColor: chartType === "line" ? backgroundColors : "#ffffff",
        pointBackgroundColor: chartType === "line" ? backgroundColors : "#000",
        borderWidth: 2,
        tension: chartType === "line" ? 0.4 : 0,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
  };

  const is2DChart = ["column", "line", "pie", "donut"].includes(chartType);

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      options,
      ref: chartRef,
    };

    switch (chartType) {
      case "column":
        return <Bar {...commonProps} />;
      case "line":
        return <Line {...commonProps} />;
      case "pie":
        return <Pie {...commonProps} />;
      case "donut":
        return <Doughnut {...commonProps} />;
      case "3d-pie":
        return (
          <div className="shadow-xl rounded-lg p-4 bg-white">
            <Plot
              data={[
                {
                  type: "pie",
                  labels: xValues,
                  values: yValues,
                  marker: { colors: backgroundColors },
                  hole: 0.2,
                },
              ]}
              layout={{
                title: "3D Pie Chart (Simulated)",
                height: 500,
                width: 600,
              }}
            />
          </div>
        );
      case "3d-column":
        return (
          <div className="shadow-xl rounded-lg p-4 bg-white">
            <Plot
              data={[
                {
                  type: "bar",
                  x: xValues,
                  y: yValues,
                  marker: { color: backgroundColors },
                },
              ]}
              layout={{
                title: "3D Column Chart (Simulated)",
                height: 500,
                width: 700,
                scene: {
                  xaxis: { title: xAxis },
                  yaxis: { title: yAxis },
                },
                margin: { t: 40, b: 40, l: 40, r: 40 },
              }}
            />
          </div>
        );
      case "3d-line":
        return (
          <Plot
            data={[
              {
                type: "scatter3d",
                mode: "lines+markers",
                x: xValues,
                y: yValues,
                z: zValues,
                line: { width: 4, color: "#1f77b4" },
                marker: { size: 4, color: "#1f77b4" },
              },
            ]}
            layout={{
              title: "3D Line Chart",
              height: 500,
              width: 700,
              scene: {
                xaxis: { title: xAxis },
                yaxis: { title: yAxis },
                zaxis: { title: zAxis || "Index" },
              },
            }}
          />
        );
      default:
        return <div className="text-red-600 font-semibold">Unsupported chart type</div>;
    }
  };

  const handleDownloadPNG = async () => {
    if (chartRef.current?.canvas) {
      const canvas = chartRef.current.canvas;
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "chart.png";
      link.click();
    } else {
      alert("PNG download is only available for 2D Chart.js types.");
    }
  };

  const handleDownloadPDF = async () => {
    if (chartRef.current?.canvas) {
      const canvas = chartRef.current.canvas;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
      pdf.save("chart.pdf");
    } else {
      alert("PDF export is only supported for 2D charts.");
    }
  };

  const handleSaveChart = async () => {
    setSaving(true);
    try {
      const payload = {
        xAxis,
        yAxis,
        zAxis: zAxis || null,
        chartType,
        labels: xValues,
        values: yValues,
        fileName: selectedFile?.name || "Unknown",
      };

      const res = await fetch("http://localhost:7000/api/charts/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      alert(result.message || "Chart saved successfully!");
    } catch (err) {
      alert("Failed to save chart.");
    } finally {
      setSaving(false);
    }
  };

  const handleGetSummary = async () => {
    setSummarizing(true);
    try {
      const res = await fetch("http://localhost:7000/api/charts/ai-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ xAxis, yAxis, zAxis, labels: xValues, values: yValues }),
      });
      const data = await res.json();
      setSummary(data.summary || "No summary returned.");
    } catch (err) {
      setSummary("Error generating summary.");
    } finally {
      setSummarizing(false);
    }
  };

  return (
    <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Generated Chart</h2>
      <div style={{ height: chartType === "line" || chartType === "column" ? "400px" : "auto" }}>
        {renderChart()}
      </div>

      <div className="mt-6 flex gap-4 flex-wrap">
        <button
          onClick={handleDownloadPNG}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          disabled={!is2DChart}
        >
          Download PNG
        </button>
        <button
          onClick={handleDownloadPDF}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          disabled={!is2DChart}
        >
          Download PDF
        </button>
        <button
          onClick={handleSaveChart}
          disabled={saving}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          {saving ? "Saving..." : "Save Analysis"}
        </button>
        <button
          onClick={handleGetSummary}
          disabled={summarizing}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow"
        >
          {summarizing ? "Analyzing..." : "Get AI Summary"}
        </button>
      </div>

      {summary && (
        <div className="mt-6 bg-gray-100 p-4 rounded border border-gray-300">
          <h3 className="text-lg font-semibold mb-2 text-[#4b2e2e]">AI Summary</h3>
          <p className="text-gray-700 whitespace-pre-line">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default ChartSection;

