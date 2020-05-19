const router = require("express").Router();
const adminController = require("../controllers/adminController");

// ? Category End Point
router.get("/category", adminController.viewCategory);
router.post("/category", adminController.addCategory);
router.put("/category", adminController.editCategory);
router.delete("/category/:id", adminController.deleteCategory);

// ? Another End Point
router.get("/dashboard", adminController.viewDashboard);
router.get("/bank", adminController.viewBank);
router.get("/item", adminController.viewItem);
router.get("/booking", adminController.viewBooking);

module.exports = router;
