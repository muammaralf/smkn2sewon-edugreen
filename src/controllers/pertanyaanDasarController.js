const pertanyaan = require("../services/pertanyaanDasarServices");
const { successResponse, errorResponse } = require("../utils/responseHandler");

exports.getPrimaryQuestionByClassId = async (req, res) => {
  const { classId } = req.params;
  try {
    const primaryQuestion = await pertanyaan.getPrimaryQuestionByClassId(
      parseInt(classId)
    );
    return successResponse(
      res,
      200,
      "Berhasil menampilkan pertanyaan dasar.",
      primaryQuestion
    );
  } catch (error) {
    return errorResponse(res, 500, "Gagal menampilkan pertanyaan dasar.");
  }
};

exports.getStudentPrimaryAnswerByClassId = async (req, res) => {
  const { classId } = req.params;
  try {
    const studenAnswerByClass =
      await pertanyaan.getStudentPrimaryAnswerByClassId(parseInt(classId));
    return successResponse(
      res,
      200,
      "Berhasil menampilkan jawaban siswa di kelas ini.",
      studenAnswerByClass
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Gagal menampilkan jawaban seluruh siswa.");
  }
};

exports.getStudentPrimaryAnswer = async (req, res) => {
  const { userId, classId } = req.params;
  try {
    const studentPrimaryAnswer = await pertanyaan.getPrimaryStudentAnswer(
      parseInt(userId),
      parseInt(classId)
    );
    return successResponse(
      res,
      200,
      "Berhasil menampilkan jawaban siswa.",
      studentPrimaryAnswer
    );
  } catch (error) {
    return errorResponse(res, 500, "Gagal menampilkan jawaban siswa.");
  }
};

exports.insertPrimaryQuestion = async (req, res) => {
  const { classId, question } = req.body;
  try {
    const insertPertanyaan = await pertanyaan.insertPrimaryQuestion(
      parseInt(classId),
      question
    );
    return successResponse(
      res,
      200,
      "Berhasil membuat pertanyaan dasar.",
      insertPertanyaan
    );
  } catch (error) {
    errorResponse(res, 500, "Gagal membuat pertanyan dasar.");
  }
};

exports.insertStudentPrimaryAnswer = async (req, res) => {
  const { answer, primaryQuestionId } = req.body;
  const { userId } = req.params;
  try {
    const insertPrimaryAnswer = await pertanyaan.insertStudentsPrimaryAnswer(
      answer,
      parseInt(primaryQuestionId),
      parseInt(userId)
    );
    return successResponse(
      res,
      200,
      "Berhasil mengirim jawaban pertanyaan dasar.",
      insertPrimaryAnswer
    );
  } catch (error) {
    return errorResponse(res, 500, "Gagal mengirim jawaban pertanyaan dasar.");
  }
};

exports.updateStudentPrimaryAnswer = async (req, res) => {
  const { answerId } = req.params;
  const { answer } = req.body;
  console.log(answerId);
  try {
    const updateAnswer = await pertanyaan.updateStudentPrimaryAnswer(
      answer,
      parseInt(answerId)
    );
    return successResponse(
      res,
      200,
      "Berhasil mengubah jawaban.",
      updateAnswer
    );
  } catch (error) {
    return errorResponse(res, 500, "Gagal mengubah jawaban.");
  }
};
