
const express= require("express");
const router = express.Router();
const { registerUser, loginUser,logoutUser, userProfile,updateProfile} = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../utils/multer"); 

router.post("/register",registerUser);

router.post("/login",loginUser);


//logout
router.post("/logout",logoutUser);

// FIX: renamed from /logout to /userlogout to avoid conflict with admin logout route
router.post("/userlogout",logoutUser);

// FIX: moved checkAuth here from materialRoutes (this is the correct home for it)
router.get("/checkAuth", authMiddleware, (req, res) => {
  res.status(200).json({ 
    message: "User is authenticated", 
    user: req.user,
    loggedIn: true
  });
});

router.get("/getProfile",authMiddleware,userProfile);

router.patch("/updateProfile",authMiddleware,upload.single("photo"),updateProfile);

module.exports=router;

