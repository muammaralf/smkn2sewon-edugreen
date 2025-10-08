// jawabanSiswaControllers.js

const jawabanSiswaServices = require("../services/jawabanSiswaServices");
const { successResponse, errorResponse } = require("../utils/responseHandler");

// Submit a student's answer

exports.submitStudentAnswer = async (req, res) => {
  const { taskType, answers } = req.body;
  const { userId } = req.params;

  try {
    const answer = await jawabanSiswaServices.submitStudentAnswer(
      parseInt(userId),
      answers,
      taskType
    );
    return successResponse(res, 201, "Jawaban berhasil disubmit", answer);
  } catch (error) {
    console.error("Error submitting student answer:", error);
    return errorResponse(res, 500, "Gagal mengirimkan jawaban siswa");
  }
};

// Get Jawban siswa by user by class by tipe
exports.getAnswerByUserClassType = async (req, res) => {
  const { userId, classId, taskType } = req.params;
  try {
    const studentAnswer = await jawabanSiswaServices.getAnswerByUserClassType(
      parseInt(userId),
      parseInt(classId),
      taskType
    );
    return successResponse(
      res,
      200,
      "Berhasil menampilkan jawaban siswa.",
      studentAnswer
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Gagal menampilan jawaban siswa.");
  }
};

exports.getStudentScore = async (req, res) => {
  const { userId, classId, taskType } = req.params;
  try {
    const studentScore = await jawabanSiswaServices.getStudentScore(
      parseInt(userId),
      parseInt(classId),
      taskType
    );
    return successResponse(
      res,
      200,
      "Berhasil menampilkan nilai siswa.",
      studentScore
    );
  } catch (error) {
    return errorResponse(res, 500, "Gagal menampilkan nilai siswa.");
  }
};

exports.getStudentScoreByClassId = async (req, res) => {
  const { classId } = req.params;
  try {
    const studentsScore = await jawabanSiswaServices.getStudentScoreByClassId(
      parseInt(classId)
    );
    return successResponse(
      res,
      200,
      "Berhasil menampilkan nilai seluruh siswa.",
      studentsScore
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Gagal menampilkan nilai.", error.message);
  }
};
