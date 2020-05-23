const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { upload, uploadMultiple } = require("../middlewares/multer");
const login = require("../middlewares/auth");

router.get("/signin", adminController.viewSignIn);
router.post("/signin", adminController.actionSignIn);
router.use(login);
router.get("/logout", adminController.actionLogOut);

router.get("/dashboard", adminController.viewDashboard);

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
router.post("/item/add/feature", upload, adminController.addFeature);
router.put("/item/update/feature", upload, adminController.editFeature);
router.delete("/item/:itemId/feature/:id", adminController.deleteFeature);

//* Item End Point *//
router.post("/item/add/activity", upload, adminController.addActivity);
router.put("/item/update/activity", upload, adminController.editActivity);
router.delete("/item/:itemId/activity/:id", adminController.deleteActivity);

//* Item End Point *//
router.get("/booking", adminController.viewBooking);

module.exports = router;
