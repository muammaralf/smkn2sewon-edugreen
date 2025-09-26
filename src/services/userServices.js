const prisma = require("../config/db.js");
const bcrypt = require("bcryptjs");

exports.findByEmail = async (email) => {
  return prisma.user.findUnique({ where: { email } });
};

exports.createUser = async ({ firstName, lastName, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { firstName, lastName, email, password: hashedPassword },
  });
};

exports.updateUser = async (id, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return prisma.user.update({
    where: { id },
    data,
  });
};

exports.deleteUser = async (id) => {
  return prisma.user.delete({ where: { id } });
};

exports.getUserById = async (userId) => {
  try {
    return prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

exports.getUsersByClassIdRole = async (classId) => {
  return prisma.classUser.findMany({
    where: {
      classId,
      role: "STUDENT",
    },
    include: { user: true },
  });
};
