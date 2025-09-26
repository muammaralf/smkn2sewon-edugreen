const prisma = require("../config/db.js");

exports.getKelompokByClassId = async (classId) => {
  try {
    return await prisma.group.findMany({
      where: {
        classId,
      },
      include: {
        groupMembers: {
          include: { user: true },
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.insertKelompok = async (classId, name) => {
  console.log(name);
  try {
    return await prisma.group.create({
      data: {
        classId,
        name,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.insertKelompokMember = async (members) => {
  try {
    return await prisma.groupMember.createMany({
      data: { members },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.getKelompokByClassByUser = async (classId, userId) => {
  try {
    return await prisma.group.findFirst({
      where: { classId, groupMembers: { some: { userId } } },
      include: { groupMembers: { include: { user: true } } },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.updateKelompok = async (groupId, name, members) => {
  try {
    await prisma.group.update({
      where: { id: groupId },
      data: { name },
    });
    const membersData = members.map((memberId) => ({
      groupId: groupId, // Menambahkan ID grup
      userId: memberId, // ID anggota yang akan ditambahkan
    }));
    return await prisma.groupMember.createMany({
      data: membersData,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
