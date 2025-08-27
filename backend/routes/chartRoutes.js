// import express from "express";
// import Chart from "../models/Chart.js";

// const router = express.Router();

// // POST: Save a chart
// router.post("/save", async (req, res) => {
//   try {
//     const { xAxis, yAxis, chartType, labels, values, fileName } = req.body;
//     const chart = new Chart({ xAxis, yAxis, chartType, labels, values, fileName });
//     await chart.save();
//     res.status(200).json({ message: "Chart saved successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error saving chart", error: err.message });
//   }
// });

// // POST: Generate AI Summary (basic logic)
// router.post("/ai-summary", async (req, res) => {
//   try {
//     const { xAxis, yAxis, labels, values } = req.body;

//     const max = Math.max(...values);
//     const min = Math.min(...values);
//     const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);

//     const summary = `The chart shows a comparison between ${xAxis} and ${yAxis}. The maximum value is ${max}, minimum is ${min}, and the average is ${avg}.`;

//     res.status(200).json({ summary });
//   } catch (err) {
//     res.status(500).json({ message: "Error generating summary", error: err.message });
//   }
// });

// // GET: All saved charts
// router.get("/all", async (req, res) => {
//   try {
//     const charts = await Chart.find().sort({ createdAt: -1 });
//     res.status(200).json(charts);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching charts", error: err.message });
//   }
// });

// // DELETE: Delete a chart by ID
// router.delete("/delete/:id", async (req, res) => {
//   try {
//     const deletedChart = await Chart.findByIdAndDelete(req.params.id);
//     if (!deletedChart) {
//       return res.status(404).json({ message: "Chart not found" });
//     }
//     res.status(200).json({ message: "Chart deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error deleting chart", error: err.message });
//   }
// });

// export default router;



// import express from "express";
// import Chart from "../models/Chart.js";

// const router = express.Router();

// // POST: Save a chart
// router.post("/save", async (req, res) => {
//   try {
//     const { xAxis, yAxis, chartType, labels, values, fileName, fileId } = req.body;
//     const chart = new Chart({ xAxis, yAxis, chartType, labels, values, fileName, fileId });
//     await chart.save();
//     res.status(200).json({ message: "Chart saved successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error saving chart", error: err.message });
//   }
// });

// // POST: Generate AI Summary (basic logic)
// router.post("/ai-summary", async (req, res) => {
//   try {
//     const { xAxis, yAxis, labels, values } = req.body;

//     const max = Math.max(...values);
//     const min = Math.min(...values);
//     const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);

//     const summary = `The chart shows a comparison between ${xAxis} and ${yAxis}. The maximum value is ${max}, minimum is ${min}, and the average is ${avg}.`;

//     res.status(200).json({ summary });
//   } catch (err) {
//     res.status(500).json({ message: "Error generating summary", error: err.message });
//   }
// });

// // GET: All saved charts
// router.get("/all", async (req, res) => {
//   try {
//     const charts = await Chart.find().sort({ createdAt: -1 });
//     res.status(200).json(charts);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching charts", error: err.message });
//   }
// });

// // DELETE: Delete a chart by ID
// router.delete("/delete/:id", async (req, res) => {
//   try {
//     const deletedChart = await Chart.findByIdAndDelete(req.params.id);
//     if (!deletedChart) {
//       return res.status(404).json({ message: "Chart not found" });
//     }
//     res.status(200).json({ message: "Chart deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error deleting chart", error: err.message });
//   }
// });

// // ✅ GET: Fetch saved charts for a specific file
// router.get("/saved", async (req, res) => {
//   try {
//     const { fileName } = req.query;

//     if (!fileName) {
//       return res.status(400).json({ message: "fileName query parameter is required" });
//     }

//     const charts = await Chart.find({ fileName }).sort({ createdAt: -1 });
//     res.status(200).json(charts);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching saved charts", error: err.message });
//   }
// });

// // ✅ GET: Fetch AI summary using fileId (simulated logic)
// router.get("/ai-summary", async (req, res) => {
//   try {
//     const { fileId } = req.query;

//     if (!fileId) {
//       return res.status(400).json({ message: "fileId query parameter is required" });
//     }

//     const chart = await Chart.findOne({ fileId });

//     if (!chart) {
//       return res.status(404).json({ message: "No chart found for the given fileId" });
//     }

//     const max = Math.max(...chart.values);
//     const min = Math.min(...chart.values);
//     const avg = (chart.values.reduce((a, b) => a + b, 0) / chart.values.length).toFixed(2);

//     const summary = `The chart shows a comparison between ${chart.xAxis} and ${chart.yAxis}. The maximum value is ${max}, minimum is ${min}, and the average is ${avg}.`;

//     res.status(200).json({ summary });
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching AI summary", error: err.message });
//   }
// });

// export default router;



import express from "express";
import Chart from "../models/Chart.js";

const router = express.Router();

// ✅ POST: Save a chart (now includes imageBase64)
router.post("/save", async (req, res) => {
  try {
    const {
      xAxis,
      yAxis,
      chartType,
      labels,
      values,
      fileName,
      fileId,
      imageBase64, // ✅ Include image
    } = req.body;

    const chart = new Chart({
      xAxis,
      yAxis,
      chartType,
      labels,
      values,
      fileName,
      fileId,
      imageBase64, // ✅ Save image
    });

    await chart.save();
    res.status(200).json({ message: "Chart saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving chart", error: err.message });
  }
});

// ✅ POST: Generate AI Summary (basic logic)
router.post("/ai-summary", async (req, res) => {
  try {
    const { xAxis, yAxis, labels, values } = req.body;

    const max = Math.max(...values);
    const min = Math.min(...values);
    const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);

    const summary = `The chart shows a comparison between ${xAxis} and ${yAxis}. The maximum value is ${max}, minimum is ${min}, and the average is ${avg}.`;

    res.status(200).json({ summary });
  } catch (err) {
    res.status(500).json({ message: "Error generating summary", error: err.message });
  }
});

// ✅ GET: All saved charts (not file-specific)
router.get("/all", async (req, res) => {
  try {
    const charts = await Chart.find().sort({ createdAt: -1 });
    res.status(200).json(charts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching charts", error: err.message });
  }
});

// ✅ DELETE: Delete a chart by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedChart = await Chart.findByIdAndDelete(req.params.id);
    if (!deletedChart) {
      return res.status(404).json({ message: "Chart not found" });
    }
    res.status(200).json({ message: "Chart deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting chart", error: err.message });
  }
});

// ✅ GET: Fetch saved charts for a specific file (by fileName)
router.get("/saved", async (req, res) => {
  try {
    const { fileName } = req.query;

    if (!fileName) {
      return res.status(400).json({ message: "fileName query parameter is required" });
    }

    const charts = await Chart.find({ fileName }).sort({ createdAt: -1 });
    res.status(200).json(charts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching saved charts", error: err.message });
  }
});

// ✅ GET: Fetch AI summary using fileId (simulated logic)
router.get("/ai-summary", async (req, res) => {
  try {
    const { fileId } = req.query;

    if (!fileId) {
      return res.status(400).json({ message: "fileId query parameter is required" });
    }

    const chart = await Chart.findOne({ fileId });

    if (!chart) {
      return res.status(404).json({ message: "No chart found for the given fileId" });
    }

    const max = Math.max(...chart.values);
    const min = Math.min(...chart.values);
    const avg = (chart.values.reduce((a, b) => a + b, 0) / chart.values.length).toFixed(2);

    const summary = `The chart shows a comparison between ${chart.xAxis} and ${chart.yAxis}. The maximum value is ${max}, minimum is ${min}, and the average is ${avg}.`;

    res.status(200).json({ summary });
  } catch (err) {
    res.status(500).json({ message: "Error fetching AI summary", error: err.message });
  }
});

export default router;
