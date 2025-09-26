const express = require("express");
const router = express.Router();
const kelas = require("../controllers/kelasControllers");

router.get("/", kelas.getClasses);
router.post("/", kelas.createClass);
router.get("/:classId", kelas.getClassById);
router.put("/:id", kelas.updateClass);
router.get("/byuser/:userId/:role", kelas.getClassByUserIdUserRole);
router.post("/join", kelas.joinClass);
router.get("/class-user/:userId/:classId", kelas.getClassUserByIdUser);

module.exports = router;
