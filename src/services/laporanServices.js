const prisma = require("../config/db.js");

exports.createMaterial = async (title, filePath, groupId, size) => {
  try {
    return await prisma.report.create({
      data: {
        title,
        filePath, // Simpan URL atau path file
        groupId,
        size,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Gagal menyimpan materi");
  }
};

exports.getReportByClassId = async (classId) => {
  try {
    return await prisma.report.findMany({
      where: {
        group: {
          classId,
        },
      },
      include: {
        group: true,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Gagal mengambil data laporan kelas");
  }
};

exports.getReportByGroupId = async (groupId) => {
  try {
    return await prisma.report.findFirst({
      where: { groupId },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Gagal mengambil data laporan kelompok");
  }
};
