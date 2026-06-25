const appointmentModel = require("../models/appointmentModel");

const fieldLabels = {
  clientName: "cliente",
  appointmentDate: "data",
  appointmentTime: "hora",
  serviceDescription: "descrição do serviço",
};

function isPastAppointment(date, time) {
  const appointmentDateTime = new Date(`${date}T${time}`);
  const now = new Date();

  return appointmentDateTime < now;
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
    const formattedFields = missingFields.map((field) => fieldLabels[field]);

    return `Preencha os campos obrigatórios: ${formattedFields.join(", ")}.`;
  }

  if (isPastAppointment(data.appointmentDate, data.appointmentTime)) {
    return "A data e horário do agendamento não podem estar no passado.";
  }

  return null;
}

async function listAppointments(_request, response) {
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
      message: "Agendamento não encontrado.",
    });
  }

  return response.status(204).send();
}

module.exports = {
  listAppointments,
  createAppointment,
  deleteAppointment,
};
