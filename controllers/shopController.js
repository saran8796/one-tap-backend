import Shop from "../models/Shop.js";

// Create a new shop
export const createShop = async (req, res) => {
  try {
    const shop = await Shop.create(req.body);
    res.status(201).json(shop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all shops with services populated
export const getShops = async (req, res) => {
  try {
    const shops = await Shop.find().populate("services");
    res.json(shops);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update services for a given shop
export const updateShopServices = async (req, res) => {
  try {
    const { shopId } = req.params;
    const { serviceIds } = req.body; // Array of ServiceMaster _ids
    const shop = await Shop.findByIdAndUpdate(
      shopId,
      { services: serviceIds },
      { new: true }
    ).populate("services");
    res.json(shop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a shop
export const deleteShop = async (req, res) => {
  try {
    const { id } = req.params;
    await Shop.findByIdAndDelete(id);
    res.json({ message: "Shop deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
