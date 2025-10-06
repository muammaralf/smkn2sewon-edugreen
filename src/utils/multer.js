const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

// 🛠️ Tentukan direktori penyimpanan file (relatif terhadap proyek)
const uploadPathParts = [__dirname, "..", "..", "public", "uploads"];
const uploadDir = path.join(...uploadPathParts);

// 📂 Buat folder "uploads" jika belum ada
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 🔧 Konfigurasi penyimpanan file menggunakan Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 🏠 Set lokasi penyimpanan file
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // 🏷️ Buat nama unik dengan timestamp agar tidak bentrok
    console.log(file);
    const fileName = `${uuidv4()}_${file.originalname}`;
    cb(null, fileName);
  },
});

// ✅ Filter jenis file yang diperbolehkan (JPEG, PNG, PDF)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/docx",
    "application/doc",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Format file tidak didukung!"), false);
  }
};

// 🚀 Middleware untuk Upload Multiple Files (maks 5MB per file)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // 15MB per file
});

module.exports = upload;
