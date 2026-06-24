const database = require("../database.js");

async function findAll() {
  const result = await database.query(`
      SELECT
        id,
        client_name,
        appointment_date,
        appointment_time,
        service_description,
        created_at
      FROM
        appointments
      ORDER BY
        appointment_date ASC, appointment_time ASC
    `);

  return result.rows;
}

async function create(appointment) {
  const result = await database.query(
    `
      INSERT INTO appointments (
        client_name,
        appointment_date,
        appointment_time,
        service_description
      )
      VALUES
        ($1, $2, $3, $4)
      RETURNING
        id,
        client_name,
        appointment_date,
        appointment_time,
        service_description,
        created_at
    `,
    [
      appointment.clientName,
      appointment.appointmentDate,
      appointment.appointmentTime,
      appointment.serviceDescription,
    ],
  );

  return result.rows[0];
}

async function remove(id) {
  const result = await database.query(
    `
      DELETE FROM
        appointments
      WHERE
        id = $1
      RETURNING
        id
    `,
    [id],
  );

  return result.rowCount > 0;
}

module.exports = {
  findAll,
  create,
  remove,
};
