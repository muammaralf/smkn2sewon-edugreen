const proyek = require("../services/proyekServices.js");
const {
  successResponse,
  errorResponse,
} = require("../utils/responseHandler.js");

exports.getProyekByClassId = async (req, res) => {
  const { classId } = req.params;

  try {
    const projects = await proyek.getProyekByClassId(parseInt(classId));
    return successResponse(
      res,
      200,
      "Berhasil menampilkan proyek pada kelas ini.",
      projects
    );
  } catch (error) {
    return errorResponse(res, 500, "Gagal menampilkan proyek pada kelas ini.");
  }
};

exports.getProyekByGroupId = async (req, res) => {
  const { groupId } = req.params;

  try {
    const project = await proyek.getProyekByGroupId(parseInt(groupId));
    return successResponse(
      res,
      200,
      "Berhasil menampikan proyek kelompok.",
      project
    );
  } catch (error) {
    return errorResponse(res, 500, "Gagal menampikan proyek kelompok.");
  }
};

exports.insertProyek = async (req, res) => {
  const { title, description, groupId } = req.body;

  if (!groupId || !title || !description) {
    return errorResponse(res, 400, "Data tidak lengkap.");
  }

  try {
    const insertProject = await proyek.insertProyek(
      parseInt(groupId),
      title,
      description
    );
    return successResponse(res, 201, "Berhasil membuat proyek.", insertProject);
  } catch (error) {
    return errorResponse(res, 500, "Gagal membuat proyek.");
  }
};
