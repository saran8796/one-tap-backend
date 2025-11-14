import { Router } from "express";
import { createService, getServicesByShop, deleteService } from "../controllers/serviceController.js";

const router = Router();

router.post("/", createService);              // Add service (provide shopId in body)
router.get("/shop/:shopId", getServicesByShop); // Get all services for shop
router.delete("/:id", deleteService);         // Delete service

export default router;
