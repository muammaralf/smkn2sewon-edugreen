const express = require("express");
const router = express.Router();
const pertanyaan = require("../controllers/pertanyaanDasarController");

router.get("/byclassid/:classId", pertanyaan.getPrimaryQuestionByClassId);
router.get(
  "/jawaban/byclassid/:classId",
  pertanyaan.getStudentPrimaryAnswerByClassId
);
router.get("/jawaban/:userId/:classId", pertanyaan.getStudentPrimaryAnswer);
router.post("/", pertanyaan.insertPrimaryQuestion);
router.post("/jawaban/:userId", pertanyaan.insertStudentPrimaryAnswer);
router.put("/jawaban/:answerId", pertanyaan.updateStudentPrimaryAnswer);

module.exports = router;
