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

const corsOptions = {
  origin: function (origin, callback) {
    // Mengecek apakah origin adalah domain atau subdomain dari "cobaweb.id"
    const regex = /^https?:\/\/(.*\.)?edugreen\.id$/;
    if (regex.test(origin) || !origin) {
      callback(null, true); // Mengizinkan origin yang cocok
    } else {
      callback(new Error("Not allowed by CORS")); // Menolak origin lainnya
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // Mengizinkan beberapa metode HTTP
  allowedHeaders: ["Content-Type", "Authorization"], // Mengizinkan header tertentu
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
