const { PrismaClient } = require("@prisma/client");
const path = require("path");
const fs = require("fs");
const prisma = new PrismaClient();

/**
 * Menambahkan materi baru ke dalam database
 * @param {string} title - Judul materi
 * @param {string} path - Path atau URL file materi
 * @param {number} classId - ID kelas yang terkait
 * @returns {Promise<object>} - Data materi yang telah dibuat
 */
const createMaterial = async (title, filePath, classId, size) => {
  try {
    return await prisma.material.create({
      data: {
        title,
        filePath, // Simpan URL atau path file
        classId,
        size,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Gagal menyimpan materi");
  }
};

/**
 * Mendapatkan materi berdasarkan ID kelas
 * @param {number} classId - ID kelas
 * @returns {Promise<Array>} - Daftar materi yang terkait dengan kelas
 */
const getMaterialsByClass = async (classId) => {
  try {
    return await prisma.material.findFirst({
      where: { classId: classId },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Gagal mengambil materi");
  }
};

const deleteMaterial = async (classId) => {
  try {
    // Ambil semua materi yang terkait dengan classId
    const materials = await prisma.material.findMany({
      where: { classId },
    });

    // Pastikan ada materi yang ditemukan
    if (materials.length === 0) {
      throw new Error("Materi tidak ditemukan untuk kelas ini");
    }

    // Hapus setiap file dari sistem file
    for (const material of materials) {
      const filePath = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "uploads",
        material.filePath
      ); // Asumsikan bahwa filePath disimpan di database

      // Periksa apakah file ada sebelum mencoba menghapusnya
      if (fs.existsSync(filePath)) {
        // Hapus file dari sistem file
        fs.unlinkSync(filePath);
      }
    }

    // Setelah file dihapus, hapus entri materi dari database
    await prisma.material.deleteMany({
      where: { classId },
    });

    return { message: "Materi dan file berhasil dihapus" };
  } catch (error) {
    console.error("Error menghapus materi:", error);
    throw new Error("Gagal menghapus materi dan file terkait");
  }
};

module.exports = {
  createMaterial,
  getMaterialsByClass,
  deleteMaterial,
};
