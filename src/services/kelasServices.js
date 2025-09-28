const prisma = require("../config/db.js");

exports.getClasses = async () => {
  try {
    return await prisma.class.findMany({
      include: {
        classUsers: true,
        forums: true,
        tasks: true,
        materials: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

exports.createClass = async (data) => {
  // Validasi input
  if (!data.name || !data.deskripsi || !data.userId) {
    throw new Error("Invalid input: name, deskripsi, and userId are required.");
  }

  const inputLink = data.youtube_link;

  const youtubeID = (url) => {
    // Regex untuk menangkap ID dari berbagai jenis URL YouTube
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|share)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const match = url.match(regex);
    return match ? match[1] : null;
  };

  try {
    // Mulai transaksi untuk memastikan kedua operasi dilakukan bersama
    const result = await prisma.$transaction(
      async (prisma) => {
        const token = await generateClassToken(); // Generate token kelas
        const insertClass = await prisma.class.create({
          data: {
            name: data.name,
            deskripsi: data.deskripsi,
            youtubeID: youtubeID(inputLink) || null, // ID YouTube opsional
            token, // Token kelas yang unik
          },
        });

        // Menambahkan user dengan role teacher
        await prisma.classUser.create({
          data: {
            classId: insertClass.id,
            userId: parseInt(data.userId), // ID user yang sudah ada
            role: "TEACHER", // Atau role lain sesuai kebutuhan
          },
        });

        // Kembalikan kelas yang baru dibuat
        return insertClass;
      },
      {
        timeout: 10000, // 10 detik
      }
    );

    return result; // Mengembalikan kelas yang baru dibuat
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create class. Please try again later.");
  }
};

exports.getClassById = async (classId) => {
  try {
    const classById = await prisma.class.findUnique({
      where: { id: parseInt(classId) },
    });

    return classById;
  } catch (error) {
    throw error;
  }
};

exports.updateClass = async (id, data) => {
  try {
    return await prisma.class.update({
      where: { id },
      data,
    });
  } catch (error) {
    throw error;
  }
};

exports.getClassByUserIdUserRole = async (userId, role) => {
  try {
    // Ambil semua kelas yang diikuti oleh userId
    const classUserData = await prisma.classUser.findMany({
      where: {
        userId: parseInt(userId), // Filter berdasarkan userId
        role: role === "student" ? "STUDENT" : "TEACHER",
      },
      include: {
        class: true, // Sertakan informasi kelas yang diikuti
      },
    });

    // Untuk setiap kelas yang diikuti, kita cari guru berdasarkan role TEACHER
    const classWithTeacher = await Promise.all(
      classUserData.map(async (classUser) => {
        // Cari data guru (role = TEACHER) untuk kelas yang sesuai
        const teacher = await prisma.classUser.findFirst({
          where: {
            classId: classUser.classId, // Filter berdasarkan classId
            role: "TEACHER", // Hanya mencari dengan role guru
          },
          include: {
            user: true, // Sertakan data pengguna (guru)
          },
        });

        // Ambil nama guru dari user yang terkait
        const teacherName = teacher
          ? `${teacher.user.firstName} ${teacher.user.lastName}`
          : null;

        return {
          ...classUser.class, // Menyertakan data kelas
          teacherName, // Menyertakan nama guru
        };
      })
    );

    return classWithTeacher;
  } catch (error) {
    throw error; // Jika terjadi error, throw kembali error tersebut
  }
};

exports.joinClass = async (userId, token) => {
  try {
    // Cek apakah kelas dengan token tersebut ada
    const classExists = await prisma.class.findUnique({
      where: { token },
    });

    if (!classExists) {
      throw new Error("Kelas tidak ditemukan dengan token yang diberikan.");
    }

    const classId = classExists.id;

    // Cek apakah user sudah ada di kelas
    const existingClassUser = await prisma.classUser.findFirst({
      where: { classId, userId: parseInt(userId) },
    });

    if (existingClassUser) {
      return {
        message: "Anda telah bergabung dengan kelas ini.",
        success: false,
      };
    }

    // Jika user belum ada di kelas, tambahkan
    return await prisma.classUser.create({
      data: {
        classId: classId,
        userId: parseInt(userId),
        role: "STUDENT", // Atau role lain sesuai kebutuhan
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error(
      "Gagal bergabung dengan kelas. Periksa token dan coba lagi."
    );
  }
};

exports.getClassUserByIdUser = async (userId, classId) => {
  try {
    return await prisma.classUser.findFirst({
      where: {
        userId: parseInt(userId),
        classId: parseInt(classId),
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mengambil data kelas user.");
  }
};

const generateClassToken = async () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";
  const maxAttempts = 5; // Tentukan batas percobaan
  let attempt = 0;

  // token terdiri dari 6 karakter
  while (attempt < maxAttempts) {
    token = "";
    // Ambil karakter acak dari characters
    for (let i = 0; i < 6; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Cek apakah token sudah ada di database
    const existingClass = await prisma.class.findUnique({ where: { token } });

    if (!existingClass) {
      // Token belum ada di database, kembalikan token
      console.log(token);
      return token;
    }

    attempt++; // Increment percobaan
  }

  // Jika sudah mencapai batas percobaan, kembalikan error atau lakukan alternatif
  throw new Error("Failed to generate unique token after several attempts");
};
