const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  name: String,
  type: String,
  quantity: Number,
  totalQuantity: Number,
  status: {
    type: String,
    default: "available",
  },

  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  purpose: String,
  startDate: Date,
  endDate: Date,
});

module.exports = mongoose.model("Asset", assetSchema);