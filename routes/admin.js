const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { upload } = require("../middlewares/multer");

//* Category End Point *//
router.get("/category", adminController.viewCategory);
router.post("/category", adminController.addCategory);
router.put("/category", adminController.editCategory);
router.delete("/category/:id", adminController.deleteCategory);

//* Bank End Point *//
router.get("/bank", adminController.viewBank);
router.post("/bank", adminController.addBank);
router.put("/bank", adminController.editBank);
router.delete("/bank/:id", adminController.deleteBank);

//* Other End Point *//
router.get("/dashboard", adminController.viewDashboard);
router.get("/item", adminController.viewItem);
router.get("/booking", adminController.viewBooking);

module.exports = router;
