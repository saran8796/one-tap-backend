import { Router } from "express";
import {
  upsertManyServices,
  addCustomService,
  getAllMasterServices,
  updateServiceById,
  deleteServiceById
} from "../controllers/serviceMasterController.js";

const router = Router();

router.post("/upsert-many", upsertManyServices);     // POST array of predefined services (add or update by title)
router.post("/custom", addCustomService);            // POST one custom service (fail if duplicate title)
router.get("/", getAllMasterServices);               // GET all master services
router.put("/:id", updateServiceById);               // Update by id
router.delete("/:id", deleteServiceById);            // Delete by id

export default router;
