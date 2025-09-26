const classService = require("../services/kelasServices");
const { successResponse, errorResponse } = require("../utils/responseHandler");

exports.getClasses = async (req, res) => {
  try {
    const classes = await classService.getClasses();
    return successResponse(res, 200, "Classes fetched successfully", classes);
  } catch (error) {
    return errorResponse(res, 500, "Failed to fetch classes", error.message);
  }
};

exports.createClass = async (req, res) => {
  try {
    const createdClass = await classService.createClass(req.body);
    return successResponse(
      res,
      201,
      "Class created successfully",
      createdClass
    );
  } catch (error) {
    return errorResponse(res, 500, "Failed to create class", error.message);
  }
};

exports.getClassById = async (req, res) => {
  const { classId } = req.params;
  try {
    const users = await classService.getClassById(classId);
    return successResponse(res, 200, "Users fetched successfully", users);
  } catch (error) {
    return errorResponse(res, 500, "Failed to fetch users", error.name);
  }
};

exports.updateClass = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedClass = await classService.updateClass(id, {
      name,
      description,
    });
    return successResponse(
      res,
      200,
      "Class updated successfully",
      updatedClass
    );
  } catch (error) {
    return errorResponse(res, 500, "Failed to update class", error.message);
  }
};

exports.getClassByUserIdUserRole = async (req, res) => {
  const { userId, role } = req.params;

  try {
    const classes = await classService.getClassByUserIdUserRole(userId, role);
    return successResponse(res, 200, "Classes fetched successfully", classes);
  } catch (error) {
    return errorResponse(res, 500, "Failed to fetch classes", error.message);
  }
};

exports.joinClass = async (req, res) => {
  const { token, userId } = req.body;

  try {
    const joinedClass = await classService.joinClass(userId, token);
    if (joinedClass.message) {
      return errorResponse(res, 200, joinedClass.message);
    }
    return successResponse(
      res,
      200,
      "Berhasil bergabung ke dalam kelas.",
      joinedClass
    );
  } catch (error) {
    return errorResponse(res, 500, "Failed to join class", error.message);
  }
};

exports.getClassUserByIdUser = async (req, res) => {
  const { userId, classId } = req.params;

  try {
    const classUser = await classService.getClassUserByIdUser(userId, classId);
    return successResponse(
      res,
      200,
      "Berhasil mengambil data kelas user.",
      classUser
    );
  } catch (error) {
    return errorResponse(
      res,
      500,
      "Gagal mengambil data kelas user.",
      error.message
    );
  }
};
