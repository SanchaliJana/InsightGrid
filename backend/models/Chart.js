
// import mongoose from "mongoose";

// const chartSchema = new mongoose.Schema({
//   xAxis: String,
//   yAxis: String,
//   chartType: String,
//   labels: [String],
//   values: [Number],
//   fileName: String, 
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Chart = mongoose.model("Chart", chartSchema);
// export default Chart;

import mongoose from "mongoose";

const chartSchema = new mongoose.Schema({
  xAxis: String,
  yAxis: String,
  chartType: String,
  labels: [String],
  values: [Number],
  fileName: String,
  imageBase64: String, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Chart = mongoose.model("Chart", chartSchema);
export default Chart;

