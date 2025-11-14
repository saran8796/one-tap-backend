import { Router } from "express";
import { createShop, getShops, deleteShop, updateShopServices } from "../controllers/shopController.js";

const router = Router();

router.post("/", createShop); // Add new shop
router.get("/", getShops);    // Get all shops (populated)
router.delete("/:id", deleteShop); // Delete shop
router.post("/:shopId/services", updateShopServices); // Update services for a shop

export default router;
