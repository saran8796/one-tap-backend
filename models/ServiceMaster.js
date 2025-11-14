import mongoose from "mongoose";

const extraSchema = new mongoose.Schema({
  name: { type: String, required: true },
  appointmentType: { type: String, enum: ["online", "physical"], default: "online" },
  requiredDocuments: [{ type: String }]
}, { _id: false });

const serviceMasterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sub: { type: String },
  desc: { type: String },
  color: { type: String, default: "#3B82F6" },
  gradient: { type: String },
  icon: { type: String },
  extras: [extraSchema] // <-- This allows array of objects
}, { timestamps: true });

serviceMasterSchema.index({ title: 1 }, { unique: true });

const ServiceMaster = mongoose.model("ServiceMaster", serviceMasterSchema);
export default ServiceMaster;
