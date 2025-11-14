
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceBooking", required: true },
  customerName: String,
  customerPhone: String,
  customerEmail: String,
  service: String,
  serviceDescription: String,
  notes: String,
  documents: [{ type: Object }],
  status: { type: String, default: "pending" }, // "pending", "in-progress", "completed", "cancelled"
  amount: Number,
  date: { type: Date, default: Date.now },
  deadline: Date,
  shopId: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
