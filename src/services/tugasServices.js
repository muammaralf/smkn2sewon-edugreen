const prisma = require("../config/db.js");

exports.getTasks = async () => {
  try {
    return await prisma.task.findMany({
      include: {
        class: true, // Include class details
        answerChoices: true, // Include the possible answer choices for each task
      },
    });
  } catch (error) {
    throw new Error("Failed to fetch tasks. Please try again later.");
  }
};

exports.createTask = async (data) => {
  console.log(data);
  // Validate input data
  if (
    !data.title ||
    !data.classId ||
    !data.answerChoices ||
    data.answerChoices.length === 0
  ) {
    throw new Error(
      "Invalid input: title, classId, and at least one answer choice are required."
    );
  }

  try {
    // Create a new task in the database
    const newTask = await prisma.task.create({
      data: {
        title: data.title,
        classId: parseInt(data.classId), // Associate task with a class
      },
    });

    // Create the answer choices for the task
    const answerChoicesData = data.answerChoices.map((choice) => ({
      content: choice.content,
      isCorrect: choice.isCorrect,
      taskId: newTask.id, // Link the answer choice to the created task
    }));

    // Add answer choices to the task
    await prisma.answerChoice.createMany({
      data: answerChoicesData,
    });

    return newTask; // Return the created task
  } catch (error) {
    throw new Error("Failed to create task. Please try again later.");
  }
};

exports.getTaskById = async (taskId) => {
  try {
    // Find a task by its ID, including answer choices
    const task = await prisma.task.findUnique({
      where: { id: parseInt(taskId) },
      include: {
        class: true, // Include class information
        answerChoices: true, // Include answer choices
      },
    });

    if (!task) {
      throw new Error("Task not found.");
    }

    return task; // Return the task with its answer choices
  } catch (error) {
    throw new Error("Failed to fetch task details.");
  }
};

exports.updateTask = async (taskId, data) => {
  // Validate input data
  if (!data.title || !data.answerChoices || data.answerChoices.length === 0) {
    throw new Error(
      "Invalid input: title and at least one answer choice are required."
    );
  }

  try {
    // Update the task's title
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(taskId) },
      data: {
        title: data.title,
      },
    });

    // Delete the existing answer choices and add new ones
    await prisma.answerChoice.deleteMany({
      where: { taskId: parseInt(taskId) },
    });

    const answerChoicesData = data.answerChoices.map((choice) => ({
      content: choice.content,
      isCorrect: choice.isCorrect,
      taskId: parseInt(taskId),
    }));

    // Create new answer choices for the updated task
    await prisma.answerChoice.createMany({
      data: answerChoicesData,
    });

    return updatedTask; // Return the updated task
  } catch (error) {
    throw new Error("Failed to update task. Please try again later.");
  }
};

exports.deleteTask = async (taskId) => {
  try {
    // Delete teh student answers
    await prisma.studentAnswer.deleteMany({
      where: { taskId: parseInt(taskId) },
    });

    // Delete the task and its associated answer choices
    await prisma.answerChoice.deleteMany({
      where: { taskId: parseInt(taskId) },
    });

    const deletedTask = await prisma.task.delete({
      where: { id: parseInt(taskId) },
    });

    return deletedTask; // Return the deleted task
  } catch (error) {
    throw new Error("Failed to delete task. Please try again later.");
  }
};

exports.getTasksByClassId = async (classId) => {
  try {
    // Get all tasks for a specific class
    const tasks = await prisma.task.findMany({
      where: {
        classId: parseInt(classId),
      },
      include: {
        class: true, // Include class details
        answerChoices: true, // Include answer choices
      },
    });

    return tasks; // Return tasks for the class
  } catch (error) {
    throw new Error("Failed to retrieve tasks for the class.");
  }
};
