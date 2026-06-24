const app = require("../app");
const appointmentModel = require("../models/appointmentModel");

function isPastDate(date) {
  const today = new Date();
  const appointmentDate = new Date(`${date}T00:00:00`);

  today.setHours(0, 0, 0, 0);

  return appointmentDate < today;
}

function validateAppointment(data) {
  const requiredFields = [
    "clientName",
    "appointmentDate",
    "appointmentTime",
    "serviceDescription",
  ];

  const missingFields = requiredFields.filter((field) => !data[field]);

  if (missingFields.length > 0) {
    return `Preencha os campos faltantes: ${missingFields.join(", ")}`;
  }

  if (isPastDate(data.appointmentDate)) {
    return "A data da consulta não pode estar no passado.";
  }

  return null;
}

async function listAppointments(request, response) {
  const appointments = await appointmentModel.findAll();

  return response.status(200).json(appointments);
}

async function createAppointment(request, response) {
  const validationError = validateAppointment(request.body);

  if (validationError) {
    return response.status(400).json({
      message: validationError,
    });
  }

  const appointment = await appointmentModel.create(request.body);

  return response.status(201).json(appointment);
}

async function deleteAppointment(request, response) {
  const deleted = await appointmentModel.remove(request.params.id);

  if (!deleted) {
    return response.status(404).json({
      message: "Consulta não encontrada",
    });
  }

  return response.status(204).send();
}

module.exports = {
  listAppointments,
  createAppointment,
  deleteAppointment,
};
