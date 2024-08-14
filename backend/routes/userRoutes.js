// import
const router = require("express").Router();
const userController = require("../controllers/userController");
const { authGuard } = require("../middleware/authGuard");
// const { authGuard } = require("../middleware/authGuard");

// register api
router.post("/create", userController.createUser);
//login api
router.post("/login", userController.loginUser);
// router.post("/change_password", authGuard,userController.changePassword);

// router.get('/profile', authGuard,userController.getUserProfile);
// router.put('/update_profile/:id', authGuard,userController.updateUserProfile);

router.post("/change_password", authGuard, userController.changePassword);
router.get("/profile", userController.getUserProfile);
router.put("/update_profile/:id", authGuard, userController.updateUserProfile);
//reset password
router.post("/resetpassword", userController.resetPassword);
router.post("/resetcode", userController.verifyResetCode);
router.post("/updatepassword", userController.updatePassword);

// exporting
module.exports = router;
