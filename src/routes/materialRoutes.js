const express = require("express");
const router = express.Router();
const material = require("../controllers/materialControllers");
const upload = require("../utils/multer"); // Untuk menangani file upload

// Route untuk mengunggah materi
router.post("/:classId", upload.single("file"), material.uploadMaterial);

// Route untuk mendapatkan materi berdasarkan ID kelas
router.get("/:classId", material.getMaterialsByClass);

// Route untuk menghapus materi berdasarkan ID kelas
router.delete("/:classId", material.deleteMaterial);

module.exports = router;
