const prisma = require("../config/db.js");

exports.getPrimaryQuestionByClassId = async (classId) => {
  try {
    return await prisma.primaryQuestion.findFirst({
      where: { classId },
    });
  } catch (error) {
    throw error;
  }
};

exports.getStudentPrimaryAnswerByClassId = async (classId) => {
  try {
    return await prisma.primaryAnswer.findMany({
      where: {
        primaryQuestion: { classId },
      },
      include: { user: true },
    });
  } catch (error) {
    throw error;
  }
};

exports.getPrimaryStudentAnswer = async (userId, classId) => {
  try {
    return await prisma.primaryAnswer.findFirst({
      where: { userId, primaryQuestion: { classId } },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.insertPrimaryQuestion = async (classId, question) => {
  try {
    return await prisma.primaryQuestion.create({
      data: {
        classId,
        question,
      },
    });
  } catch (error) {
    throw error;
  }
};

exports.insertStudentsPrimaryAnswer = async (
  answer,
  primaryQuestionId,
  userId
) => {
  try {
    return await prisma.primaryAnswer.create({
      data: {
        userId,
        primaryQuestionId,
        answer,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.updateStudentPrimaryAnswer = async (answer, answerId) => {
  console.log(answerId);
  try {
    return await prisma.primaryAnswer.update({
      where: { id: answerId },
      data: {
        answer,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
