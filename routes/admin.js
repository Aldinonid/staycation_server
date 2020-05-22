const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { upload, uploadMultiple } = require("../middlewares/multer");

//* Category End Point *//
router.get("/category", adminController.viewCategory);
router.post("/category", adminController.addCategory);
router.put("/category", adminController.editCategory);
router.delete("/category/:id", adminController.deleteCategory);
//* End Category End Point *//

//* Bank End Point *//
router.get("/bank", adminController.viewBank);
router.post("/bank", adminController.addBank);
router.put("/bank", adminController.editBank);
router.delete("/bank/:id", adminController.deleteBank);

//* Item End Point *//
router.get("/item", adminController.viewItem);
router.post("/item", uploadMultiple, adminController.addItem);
router.put("/item/:id", uploadMultiple, adminController.editItem);
router.delete("/item/:id/delete", adminController.deleteItem);
router.get("/item/:id", adminController.showEditItem);
router.get("/item/show-image/:id", adminController.showImageItem);

//* Feature End Point *//
router.get("/item/show-detail-item/:itemId", adminController.viewDetailItem);

//* Item End Point *//
router.get("/dashboard", adminController.viewDashboard);
router.get("/booking", adminController.viewBooking);

module.exports = router;
