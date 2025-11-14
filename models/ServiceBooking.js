import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  originalName: String,
  storedName: String,
  path: String,
  type: String,
  size: Number,
});

const serviceBookingSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userMobile: { type: String, required: true },
    service: { type: String, required: true },
    extraItem: { type: String },
    additionalInfo: { type: String },
    appointmentType: { type: String },
    appointmentDate: { type: String },
    appointmentTime: { type: String },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    userLocation: { type: String },
    documents: [documentSchema],
    status: { type: String, default: "Pending" },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const ServiceBooking = mongoose.model("ServiceBooking", serviceBookingSchema);
export default ServiceBooking;
