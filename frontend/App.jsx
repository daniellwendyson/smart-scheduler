import { useEffect, useState } from "react";

import {
  createAppointment,
  deleteAppointment,
  fetchAppointments,
} from "./services/appointmentApi";

const initialFormData = {
  clientName: "",
  appointmentDate: "",
  appointmentTime: "",
  serviceDescription: "",
};

function App() {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  async function loadAppointments() {
    const data = await fetchAppointments();
    setAppointments(data);
  }

  useEffect(() => {
    loadAppointments().catch(() => {
      setFeedback({
        type: "error",
        message: "Não foi possível carregar os agendamentos.",
      });
    });
  }, []);

  useEffect(() => {
    if (!feedback.message) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      setFeedback({ type: "", message: "" });
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [feedback.message]);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      await createAppointment(formData);
      setFormData(initialFormData);
      setFeedback({
        type: "success",
        message: "Agendamento criado com sucesso.",
      });
      await loadAppointments();
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id) {
    setFeedback({ type: "", message: "" });

    try {
      await deleteAppointment(id);
      setFeedback({
        type: "success",
        message: "Agendamento excluído com sucesso.",
      });
      await loadAppointments();
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.message,
      });
    }
  }

  return (
    <main className="app-container">
      <section className="hero">
        <p className="eyebrow">Smart Scheduler</p>
        <h1>Gestão de Agendamentos</h1>
        <p>
          Cadastre, acompanhe e remova agendamentos de serviços em uma interface
          simples.
        </p>
      </section>

      <section className="content-grid">
        <form className="appointment-form" onSubmit={handleSubmit}>
          <h2>Novo Agendamento</h2>

          <label>
            Cliente
            <input
              name="clientName"
              value={formData.clientName}
              onChange={handleInputChange}
              placeholder="Ex: Maria Eduarda"
            />
          </label>

          <label>
            Data
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Hora
            <input
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Serviço
            <textarea
              name="serviceDescription"
              value={formData.serviceDescription}
              onChange={handleInputChange}
              placeholder="Descrição do serviço"
              rows="4"
            />
          </label>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Cadastrar"}
          </button>

          {feedback.message && (
            <p className={`feedback feedback-${feedback.type}`}>
              {feedback.message}
            </p>
          )}
        </form>

        <section className="appointment-list">
          <h2>Agendamentos</h2>

          {appointments.length === 0 ? (
            <p className="empty-state">Nenhum agendamento cadastrado.</p>
          ) : (
            <ul>
              {appointments.map((appointment) => (
                <li key={appointment.id}>
                  <div>
                    <strong>{appointment.client_name}</strong>
                    <span>
                      {new Date(
                        appointment.appointment_date,
                      ).toLocaleDateString("pt-BR")}{" "}
                      às {appointment.appointment_time.slice(0, 5)}
                    </span>
                    <p>{appointment.service_description}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(appointment.id)}
                  >
                    Excluir
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </main>
  );
}

export default App;
