import ServiceMaster from "../models/ServiceMaster.js";

// Add/Update multiple master services (pre-defined data)
export const upsertManyServices = async (req, res) => {
  try {
    const { services } = req.body; // Array of service objects
    if (!Array.isArray(services)) return res.status(400).json({ message: "Invalid services array." });

    // Upsert each service (update if exists by title, insert if not)
    const results = await Promise.all(
      services.map(async service => {
        const updated = await ServiceMaster.findOneAndUpdate(
          { title: service.title },
          { $set: service },
          { upsert: true, new: true }
        );
        return updated;
      })
    );
    res.json({ message: "Services upserted.", data: results });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a custom service (only if title does not exist)
export const addCustomService = async (req, res) => {
  try {
    const { title, ...serviceData } = req.body;
    // Check if exists
    const exists = await ServiceMaster.findOne({ title });
    if (exists) return res.status(409).json({ message: "Service with this title already exists." });

    const service = await ServiceMaster.create({ title, ...serviceData });
    res.status(201).json({ message: "Custom service added.", service });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all master services
export const getAllMasterServices = async (req, res) => {
  try {
    const services = await ServiceMaster.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a service by ID
export const updateServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await ServiceMaster.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Service updated.", service: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a service by ID
export const deleteServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    await ServiceMaster.findByIdAndDelete(id);
    res.json({ message: "Service deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
