const laporan = require("../services/laporanServices.js");
const {
  successResponse,
  errorResponse,
} = require("../utils/responseHandler.js");

exports.createLaporan = async (req, res) => {
  const { groupId } = req.params;
  const file = req.file;
  const title = file.originalname;
  const size = file.size;

  // Validasi input
  if (!title || !groupId || !req.file) {
    return errorResponse(res, 400, "Data tidak lengkap");
  }

  try {
    // Menyimpan path file yang diupload
    const filePath = file.filename; // Path atau URL file

    // Menggunakan model untuk membuat materi baru
    const newLaporan = await laporan.createLaporan(
      title,
      filePath, // Mengirim path file ke model
      parseInt(groupId),
      size
    );

    return successResponse(res, 201, "Materi berhasil diunggah", newLaporan);
  } catch (error) {
    return errorResponse(res, 500, "Gagal membuat laporan.");
  }
};

exports.getLaporanByClassId = async (req, res) => {
  const { classId } = req.params;

  try {
    const reports = await laporan.getReportByClassId(parseInt(classId));
    return successResponse(
      res,
      200,
      "Berhasil menampilkan laporan pada kelas ini."
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Gagal menampilkan laporan.");
  }
};

exports.getLaporanByGroupId = async (req, res) => {
  const { groupId } = req.params;

  try {
    const reports = await laporan.getReportByGroupId(parseInt(groupId));
    return successResponse(
      res,
      200,
      "Berhasil menampilkan laporan pada kelas ini."
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Gagal menampilkan laporan.");
  }
};
