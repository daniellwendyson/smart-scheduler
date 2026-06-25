const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function fetchAppointments() {
  const response = await fetch(`${API_URL}/appointments`);

  if (!response.ok) {
    throw new Error("Não foi possível carregar os agendamentos.");
  }

  return response.json();
}

export async function createAppointment(appointment) {
  const response = await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointment),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Não foi possível criar o agendamento.");
  }

  return data;
}

export async function deleteAppointment(id) {
  const response = await fetch(`${API_URL}/appointments/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Não foi possível excluir o agendamento.");
  }
}
