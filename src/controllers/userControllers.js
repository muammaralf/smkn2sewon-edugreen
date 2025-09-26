const { successResponse, errorResponse } = require("../utils/responseHandler");
const userService = require("../services/userServices");
const jawaban = require("../services/jawabanSiswaServices");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Cek jika user sudah ada
    const existingUser = await userService.findByEmail(email);
    if (existingUser) {
      return errorResponse(res, 400, "User already exists", {
        email: "Email is already in use",
      });
    }

    // Register user baru
    const user = await userService.createUser({
      firstName,
      lastName,
      email,
      password,
    });

    // Return response sukses
    return successResponse(res, 201, "User registered successfully", {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (err) {
    // Handle error internal server
    return errorResponse(res, 500, "Internal server error", {
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  //   console.log("Login attempt with email:", email);
  //   console.log("Login attempt with password:", password);

  try {
    // Cari user berdasarkan email
    const user = await userService.findByEmail(email);
    if (!user) {
      return errorResponse(res, 400, "Invalid credentials", {
        email: "User not found",
      });
    }

    // Cek password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, 400, "Invalid credentials", {
        password: "Incorrect password",
      });
    }

    // Generate token dan kirim response sukses
    const token = generateToken(user.id);
    return successResponse(res, 200, "Login successful", {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    return errorResponse(res, 500, "Internal server error", {
      message: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;

  try {
    // Update user
    const updatedUser = await userService.updateUser(id, {
      firstName,
      lastName,
      email,
      password,
    });

    // Return response sukses
    return successResponse(res, 200, "User updated successfully", {
      id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
    });
  } catch (err) {
    return errorResponse(res, 500, "Internal server error", {
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Hapus user
    await userService.deleteUser(id);

    // Return response sukses
    return successResponse(res, 200, "User deleted successfully");
  } catch (err) {
    return errorResponse(res, 500, "Internal server error", {
      message: err.message,
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Ambil user berdasarkan kriteria
    const users = await userService.getUserById(parseInt(id));

    // Return response sukses
    return successResponse(res, 200, "Users retrieved successfully", users);
  } catch (err) {
    return errorResponse(res, 500, "Internal server error", {
      message: err.message,
    });
  }
};

const getUsersByClassIdRole = async (req, res) => {
  const { classId } = req.params;

  try {
    // Ambil user berdasarkan classId
    const users = await userService.getUsersByClassIdRole(parseInt(classId));

    // Return response sukses
    return successResponse(res, 200, "Users retrieved successfully", users);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Internal server error", {
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUsersByClassIdRole,
  getUserById,
};
