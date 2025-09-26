const proyek = require("../controllers/proyekControllers.js");
const express = require("express");
const router = express.Router();

router.get("/byclassid/:classId", proyek.getProyekByClassId);
router.get("/bygroupid/:groupId", proyek.getProyekByGroupId);
router.post("/", proyek.insertProyek);

module.exports = router;
