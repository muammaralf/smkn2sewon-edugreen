const kelompok = require("../services/kelompokServices.js");
const {
  successResponse,
  errorResponse,
} = require("../utils/responseHandler.js");

exports.getKelompokByClassId = async (req, res) => {
  const { classId } = req.params;
  try {
    const groups = await kelompok.getKelompokByClassId(parseInt(classId));
    return successResponse(
      res,
      200,
      "Berhasil menampilkan kelompok pada kelas ini.",
      groups
    );
  } catch (error) {
    console.log(error);
    return errorResponse(
      res,
      500,
      "Gagal menampilkan kelompok pada kelas ini."
    );
  }
};

exports.getKelompokByClassByUser = async (req, res) => {
  const { classId, userId } = req.params;
  try {
    const userGroup = await kelompok.getKelompokByClassByUser(
      parseInt(classId),
      parseInt(userId)
    );
    return successResponse(
      res,
      200,
      "Berhasil menampikan kelompok user.",
      userGroup
    );
  } catch (error) {
    console.log(error);
    return errorResponse(
      res,
      500,
      "Gagal menampilkan kelompok dengan user ini."
    );
  }
};

exports.insertKelompok = async (req, res) => {
  const { name, classId } = req.body;
  try {
    const insertKelompok = await kelompok.insertKelompok(
      parseInt(classId),
      name
    );
    return successResponse(
      res,
      200,
      "Berhasil membuat kelompok.",
      insertKelompok
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Gagal membuat kelompok.");
  }
};

exports.insertKelompokMember = async (req, res) => {
  const { members } = req.body;
  try {
    const kelompokMember = await kelompok.insertKelompokMember(members);
    return successResponse(
      res,
      200,
      "Berhasil memasukkan siswa ke kelompok.",
      kelompokMember
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Gagal memasukkan siswa ke kelompok.");
  }
};

exports.updateGroup = async (req, res) => {
  const { groupId, groupNameEdit, membersUpdate } = req.body;
  try {
    const groupUpdate = await kelompok.updateKelompok(
      groupId,
      groupNameEdit,
      membersUpdate
    );
    return successResponse(
      res,
      200,
      "Berhasil mengedit kelompok atau menambah anggota.",
      groupUpdate
    );
  } catch (error) {
    console.log(error);
    return errorResponse(
      res,
      500,
      "Gagal mengedit kelompok atau menambah anggota."
    );
  }
};
