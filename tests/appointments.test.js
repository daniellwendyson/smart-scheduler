const request = require("supertest");

const app = require("../backend/app.js");
const database = require("../backend/database.js");

describe("Appointments API", () => {
  beforeEach(async () => {
    await database.query("DELETE FROM appointments");
  });

  afterAll(async () => {
    await database.end();
  });

  it("Deveria criar consulta", async () => {
    const response = await request(app).post("/appointments").send({
      clientName: "Maria Eduarda",
      appointmentDate: "2026-07-10",
      appointmentTime: "14:30",
      serviceDescription: "Reunião",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.client_name).toBe("Maria Eduarda");
  });

  it("Deveria listar consultas", async () => {
    await request(app).post("/appointments").send({
      clientName: "João Souza",
      appointmentDate: "2026-07-11",
      appointmentTime: "10:00",
      serviceDescription: "Consulta",
    });

    const response = await request(app).get("/appointments");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it("Não deveria criar consultas com campos faltantes", async () => {
    const response = await request(app).post("/appointments").send({
      clientName: "",
      appointmentDate: "2026-07-10",
      appointmentTime: "14:30",
      serviceDescription: "Corte de cabelo",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("Não deveria criar uma consulta no passado", async () => {
    const response = await request(app).post("/appointments").send({
      clientName: "Rickson Gracie",
      appointmentDate: "2020-01-01",
      appointmentTime: "09:00",
      serviceDescription: "Jiu-Jitsu",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("Deveria deletar uma consulta", async () => {
    const createResponse = await request(app).post("/appointments").send({
      clientName: "Carlos Mendes",
      appointmentDate: "2026-07-12",
      appointmentTime: "15:00",
      serviceDescription: "Barba",
    });

    const deleteResponse = await request(app).delete(
      `/appointments/${createResponse.body.id}`,
    );

    expect(deleteResponse.status).toBe(204);
  });
});
