const materialService = require("../services/materialServices.js");
const {
  successResponse,
  errorResponse,
} = require("../utils/responseHandler.js");

/**
 * Controller untuk mengunggah materi
 * @param {object} req - Request object
 * @param {object} res - Response object
 */
const uploadMaterial = async (req, res) => {
  const { classId } = req.params;
  const file = req.file;
  const title = file.originalname;
  const size = file.size;

  console.log(title);

  // Validasi input
  if (!title || !classId || !req.file) {
    return errorResponse(res, 400, "Data tidak lengkap");
  }

  try {
    // Menyimpan path file yang diupload
    const filePath = file.filename; // Path atau URL file

    // Menggunakan model untuk membuat materi baru
    const newMaterial = await materialService.createMaterial(
      title,
      filePath, // Mengirim path file ke model
      parseInt(classId),
      size
    );

    return successResponse(res, 201, "Materi berhasil diunggah", newMaterial);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Gagal mengunggah materi");
  }
};

/**
 * Controller untuk mengambil materi berdasarkan ID kelas
 * @param {object} req - Request object
 * @param {object} res - Response object
 */
const getMaterialsByClass = async (req, res) => {
  const { classId } = req.params;

  try {
    const materials = await materialService.getMaterialsByClass(
      parseInt(classId)
    );

    if (materials.length === 0) {
      return errorResponse(res, 404, "Tidak ada materi untuk kelas ini");
    }

    return successResponse(res, 200, "Materi berhasil diambil", materials);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Gagal mengambil materi");
  }
};

const deleteMaterial = async (req, res) => {
  const { classId } = req.params;

  try {
    await materialService.deleteMaterial(parseInt(classId));
    return successResponse(res, 200, "Materi berhasil dihapus");
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Gagal menghapus materi");
  }
};

module.exports = {
  uploadMaterial,
  getMaterialsByClass,
  deleteMaterial,
};
