const prisma = require("../config/db.js");

exports.getProyekByClassId = async (classId) => {
  try {
    return await prisma.project.findMany({
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
    throw new Error("Gagal mengambil data proyek kelas");
  }
};

exports.getProyekByGroupId = async (groupId) => {
  try {
    return await prisma.project.findFirst({
      where: { groupId },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Gagal mengambil data proyek kelompok");
  }
};

exports.insertProyek = async (groupId, title, description) => {
  try {
    const newProject = await prisma.project.create({
      data: {
        groupId,
        title,
        description,
      },
    });
    return newProject;
  } catch (error) {
    console.log(error);
    throw new Error("Gagal menyimpan proyek");
  }
};
