// jawabanSiswaRouter.js

const express = require("express");
const router = express.Router();
const jawabanSiswaControllers = require("../controllers/jawabanSiswaControllers");

router.get(
  "/nilai/byclassid/:classId",
  jawabanSiswaControllers.getStudentScoreByClassId
);
router.get(
  "/:userId/:classId/:taskType",
  jawabanSiswaControllers.getAnswerByUserClassType
);
router.post("/:userId", jawabanSiswaControllers.submitStudentAnswer);
router.get(
  "/nilai/:userId/:classId/:taskType",
  jawabanSiswaControllers.getStudentScore
);

module.exports = router;
