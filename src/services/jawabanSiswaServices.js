const prisma = require("../config/db.js");

// Submit a student's answer to a task
exports.submitStudentAnswer = async (userId, answers, taskType) => {
  try {
    const studentAnswers = [];

    // Iterasi melalui setiap entri dalam answers
    for (const [taskId, answerData] of Object.entries(answers)) {
      const parsedTaskId = parseInt(taskId, 10);

      // Pastikan taskId adalah angka yang valid
      if (isNaN(parsedTaskId)) {
        throw new Error(`Invalid taskId: ${parsedTaskId}`);
      }

      // Untuk setiap taskId, buat record baru dalam array studentAnswers
      studentAnswers.push({
        userId,
        taskId: parsedTaskId,
        answerId: answerData.answerId, // Asumsi bahwa answerId adalah data yang akan disimpan
        taskType, // Menambahkan taskType (pretest atau posttest)
      });
    }

    // Proses upsert untuk setiap entry menggunakan Prisma upsert
    const upsertedAnswers = await Promise.all(
      studentAnswers.map(async (answer) => {
        return prisma.studentAnswer.upsert({
          where: {
            userId_taskId_taskType: {
              // Menggunakan composite unique constraint (userId, taskId, taskType)
              userId: answer.userId,
              taskId: answer.taskId,
              taskType: answer.taskType, // Pastikan taskType juga digunakan dalam where
            },
          },
          update: {
            answerId: answer.answerId,
            taskType: answer.taskType,
          },
          create: {
            userId: answer.userId,
            taskId: answer.taskId,
            answerId: answer.answerId,
            taskType: answer.taskType,
          },
        });
      })
    );

    return upsertedAnswers;
  } catch (error) {
    console.error("Error submitting student answer:", error);
    throw error;
  }
};

exports.getAnswerByUserClassType = async (userId, classId, taskType) => {
  try {
    const studentAnswer = await prisma.studentAnswer.findMany({
      where: {
        userId,
        task: {
          classId,
        },
        taskType: taskType.toUpperCase(),
      },
      include: {
        answer: true, // Mengambil pilihan jawaban yang dipilih siswa
        task: true, // Mengambil soal terkait
      },
    });

    return studentAnswer;
  } catch (error) {
    throw error;
  }
};

exports.getStudentScore = async (userId, classId, taskType) => {
  try {
    const studentAnswers = await prisma.studentAnswer.findMany({
      where: {
        userId,
        task: {
          classId,
        },
        taskType: taskType.toUpperCase(),
      },
      include: {
        answer: true, // Mengambil pilihan jawaban yang dipilih siswa
        task: true, // Mengambil soal terkait
      },
    });

    // Hitung jawaban benar
    let correctAnswers = 0;
    const totalQuestions = studentAnswers.length;

    studentAnswers.forEach((studentAnswer) => {
      if (studentAnswer.answer.isCorrect) {
        correctAnswers++;
      }
    });

    // Menghitung persentase
    const score = (correctAnswers / totalQuestions) * 100;
    const roundedScore = Math.round(score * 10) / 10; // Membulatkan satu tempat desimal

    return roundedScore;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.getStudentScoreByClassId = async (classId) => {
  try {
    const students = await prisma.classUser.findMany({
      where: { classId, role: "STUDENT" },
      include: {
        user: { select: { id: true, firstName: true, lastName: true } },
      },
    });

    const studentScores = [];

    for (const student of students) {
      const pretestScore = await exports.getStudentScore(
        student.user.id,
        classId,
        "pretest"
      );
      const posttestScore = await exports.getStudentScore(
        student.user.id,
        classId,
        "posttest"
      );

      studentScores.push({
        userId: student.user.id,
        scores: [
          { taskType: "pretest", score: pretestScore },
          { taskType: "posttest", score: posttestScore },
        ],
      });
    }

    return studentScores;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
