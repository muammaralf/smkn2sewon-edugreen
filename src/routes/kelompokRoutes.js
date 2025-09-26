const express = require("express");
const router = express.Router();
const kelompok = require("../controllers/kelompokControllers.js");

router.get("/byclassid/:classId", kelompok.getKelompokByClassId);
router.get(
  "/byclassbyuser/:classId/:userId",
  kelompok.getKelompokByClassByUser
);
router.post("/", kelompok.insertKelompok);
router.post("/member", kelompok.insertKelompokMember);
router.put("/update", kelompok.updateGroup);

module.exports = router;
