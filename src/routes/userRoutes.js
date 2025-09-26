const express = require("express");
const router = express.Router();
const users = require("../controllers/userControllers");

router.post("/register", users.registerUser);
router.post("/login", users.loginUser);
router.put("/:id", users.updateUser);
router.delete("/:id", users.deleteUser);
router.get("/byclassidrole/:classId", users.getUsersByClassIdRole);
router.get("/byid/:id", users.getUserById);
module.exports = router;
