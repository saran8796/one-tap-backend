import { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = Router();

router.get("/", getAllOrders); // GET /api/orders?shopId=xxx
router.get("/:id", getOrderById); // GET /api/orders/:id
router.put("/:id/status", updateOrderStatus); // PUT /api/orders/:id/status { status: "completed" }

export default router;
