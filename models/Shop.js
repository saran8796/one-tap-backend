import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  open: { type: Boolean, default: true },
  established: { type: String },
  clientBase: { type: String },
  efficiency: { type: String },
  serviceLevel: { type: String, enum: ["Standard", "Enterprise"], default: "Standard" },
  premiumPartner: { type: Boolean, default: false },
  contact: { type: String },
  email: { type: String },
  workingHours: {
    weekdays: { type: String },
    weekends: { type: String }
  },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "ServiceMaster" }] // Link to master
}, { timestamps: true });

const Shop = mongoose.model("Shop", shopSchema);
export default Shop;
