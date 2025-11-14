import Service from "../models/Service.js";
import Shop from "../models/Shop.js";

// Create a service and link to shop
export const createService = async (req, res) => {
  try {
    const { shopId, ...serviceData } = req.body;
    const service = await Service.create({ ...serviceData, shop: shopId });

    // Link service to shop
    await Shop.findByIdAndUpdate(shopId, { $push: { services: service._id } });

    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all services for a shop
export const getServicesByShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    const services = await Service.find({ shop: shopId });
    res.json(services);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (service) {
      await Shop.findByIdAndUpdate(service.shop, { $pull: { services: service._id } });
    }
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
