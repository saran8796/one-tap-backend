import { Router } from "express";
import multer from "multer";
import {
  createBooking,
  getAllBookings,
  acceptRequestAndCreateOrder,
} from "../controllers/serviceBookingController.js";
const upload = multer({ dest: "uploads/" });
const router = Router();

router.post("/", upload.array("documents"), createBooking);
router.get("/", getAllBookings);
router.put("/accept/:bookingId", acceptRequestAndCreateOrder);
export default router;
