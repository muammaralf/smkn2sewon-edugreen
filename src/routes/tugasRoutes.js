const express = require("express");
const router = express.Router();
const tugas = require("../controllers/tugasControllers");

router.get("/", tugas.getTasks);
router.post("/", tugas.createTask);
router.get("/byid/:id", tugas.getTaskById);
router.put("/:id", tugas.updateTask);
router.delete("/:id", tugas.deleteTask);
router.get("/byclassid/:classId", tugas.getTasksByClassId);

module.exports = router;
