const tugasServices = require("../services/tugasServices");
const { successResponse, errorResponse } = require("../utils/responseHandler");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await tugasServices.getTasks();
    return successResponse(res, 200, "Berhasil Menampilkan Semua Soal.", tasks);
  } catch (error) {
    return errorResponse(res, 500, "Gagal menampilkan seluruh soal.");
  }
};

exports.createTask = async (req, res) => {
  const { title, classId, answerChoices } = req.body;

  // Validate that the necessary fields are provided
  if (!title || !classId || !answerChoices || answerChoices.length === 0) {
    return errorResponse(res, 400, "Data tidak valid");
  }

  try {
    // Create a new task and associated answer choices
    const newTask = await tugasServices.createTask({
      title,
      classId,
      answerChoices,
    });

    return successResponse(res, 200, "Berhasil membuat soal.", newTask);
  } catch (error) {
    return errorResponse(res, 500, "Gagal membuat soal. Mohon coba lagi.");
  }
};

exports.getTaskById = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await tugasServices.getTaskById(taskId);
    return successResponse(res, 200, "Berhasil menampilkan soal.", task);
  } catch (error) {
    return errorResponse(res, 500, "Gagal menampilan soal.");
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, answerChoices } = req.body;

  // Validate that the necessary fields are provided
  if (!title || !answerChoices || answerChoices.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid input: title and answerChoices are required.",
    });
  }

  try {
    // Update the task and answer choices
    const updatedTask = await tugasServices.updateTask(id, {
      title,
      answerChoices,
    });

    return successResponse(res, 200, "Berhasil mengedit soal.", updatedTask);
  } catch (error) {
    return errorResponse(res, 500, "Gagal mengedit soal. Coba lagi nanti.");
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await tugasServices.deleteTask(id);
    return successResponse(res, 200, "Berhasil menghapus soal", deletedTask);
  } catch (error) {
    return errorResponse(res, 500, "Gagal menghapus soal");
  }
};

exports.getTasksByClassId = async (req, res) => {
  const { classId } = req.params;

  try {
    const tasks = await tugasServices.getTasksByClassId(classId);
    return successResponse(
      res,
      200,
      "Berhasil menampilkan soal dari kelas ini.",
      tasks
    );
  } catch (error) {
    return errorResponse(res, 500, "Gagal menampilkan soal kelas ini.");
  }
};
