import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true }, // Link to parent shop
  title: { type: String, required: true },
  sub: { type: String }, // Tamil Name
  desc: { type: String, required: true },
  color: { type: String, default: "#3B82F6" },
  gradient: { type: String },
  icon: { type: String },
  extras: [{ type: String }] // sub-services (array)
}, { timestamps: true });

const Service = mongoose.model("Service", serviceSchema);
export default Service;
