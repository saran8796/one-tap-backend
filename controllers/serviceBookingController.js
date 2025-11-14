import ServiceBooking from "../models/ServiceBooking.js";
import Order from "../models/Order.js";

export const acceptRequestAndCreateOrder = async (req, res) => {
  try {
    const { bookingId } = req.params; // 1. Update request status to "accepted"

    const booking = await ServiceBooking.findByIdAndUpdate(
      bookingId,
      { status: "accepted" },
      { new: true }
    );

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    } // 2. Create corresponding order in the orders collection

    const order = await Order.create({
      bookingId: booking._id,
      customerName: booking.userName,
      customerPhone: booking.userMobile,
      customerEmail: booking.userEmail,
      service: booking.service,
      serviceDescription: booking.serviceDescription,
      notes: booking.notes || "",
      documents: booking.documents,
      // status: { type: String, default: "pending" }, // "pending", "in-progress", "completed", "cancelled"
      amount: booking.amount || 0,
      date: new Date(),
      deadline: new Date(),
      shopId: booking.shopId,
    });

    res.json({ success: true, booking, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createBooking = async (req, res) => {
  try {
    const {
      userName,
      userEmail,
      userMobile,
      service,
      extraItem,
      additionalInfo,
      appointmentType,
      appointmentDate,
      appointmentTime,
      shopId,
      userLocation,
      status,
    } = req.body;

    let files = [];
    if (req.files && req.files.length > 0) {
      files = req.files.map((file) => ({
        originalName: file.originalname,
        storedName: file.filename,
        path: file.path,
        type: file.mimetype,
        size: file.size,
      }));
    }

    const booking = await ServiceBooking.create({
      userName,
      userEmail,
      userMobile,
      service,
      extraItem,
      additionalInfo,
      appointmentType,
      appointmentDate,
      appointmentTime,
      shopId,
      userLocation,
      documents: files,
      status,
    });

    // ✅ EMIT REAL-TIME NOTIFICATION TO FRONTEND
    if (global.io) {
      console.log("Emitting new_service_request:", { shopId, userName }); // <-- Add this!
      global.io.emit("new_service_request", {
        shopId,
        userName,
        userMobile,
        service,
        time: new Date(),
      });
    }

    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const filter = {};
    if (req.query.shopId) filter.shopId = req.query.shopId;
    const bookings = await ServiceBooking.find(filter).sort({ created_at: -1 });
    res.json({ bookings });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
