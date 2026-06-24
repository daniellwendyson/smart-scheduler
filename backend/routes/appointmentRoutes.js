const express = require("express");

const appointmentController = require("../controllers/appointmentController.js");

const router = express.Router();

router.get("/appointments", appointmentController.listAppointments);
router.post("/appointments", appointmentController.createAppointment);
router.delete("/appointments/:id", appointmentController.deleteAppointment);

module.exports = router;
