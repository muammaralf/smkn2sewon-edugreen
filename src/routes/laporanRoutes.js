const laporan = require("../controllers/laporanControllers.js");
const express = require("express");
const router = express.Router();
const upload = require("../utils/multer.js");

router.post("/", upload.single("file"), laporan.createLaporan);
router.get("/bycclassid/:classId", laporan.getLaporanByClassId);
router.get("/bygroupid/:groupId", laporan.getLaporanByClassId);

module.exports = router;
