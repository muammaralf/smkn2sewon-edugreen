const express = require("express");
const userRoutes = require("./routes/userRoutes.js");
const kelasRoutes = require("./routes/kelasRoutes.js");
const tugasRoutes = require("./routes/tugasRoutes.js");
const jawabanSiswaRouter = require("./routes/jawabanSiswaRoutes.js");
const pertanyaan = require("./routes/pertanyaanDasarRoutes.js");
const kelompok = require("./routes/kelompokRoutes.js");
const material = require("./routes/materialRoutes.js");
const proyek = require("./routes/proyekRoutes.js");
const laporan = require("./routes/laporanRoutes.js");
const path = require("path");

const cors = require("cors");
const app = express();

// Pengaturan CORS untuk mengizinkan akses dari smkn2sewon.edugreen.id dan localhost:5173
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"], // Bisa sesuaikan dengan metode yang kamu perlukan
  allowedHeaders: ["Content-Type", "Authorization"], // Header yang diizinkan
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/users", userRoutes);
app.use("/kelas", kelasRoutes);
app.use("/tugas", tugasRoutes);
app.use("/jawab", jawabanSiswaRouter);
app.use("/pertanyaan", pertanyaan);
app.use("/kelompok", kelompok);
app.use("/materi", material);
app.use("/proyek", proyek);
app.use("/laporan", laporan);

app.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "..", "public", "uploads", filename);

  // Ambil nama asli (setelah UUID dan underscore)
  const originalName = filename.split("_").slice(1).join("_");

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${originalName}"`
  );
  res.setHeader("Content-Type", "application/octet-stream");

  res.download(filePath, originalName, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ status: false, message: "Gagal mengunduh file" });
    }
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to the EduGreen API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
