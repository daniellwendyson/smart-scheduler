export const up = (pgm) => {
  pgm.createTable("appointments", {
    id: "id",
    client_name: {
      type: "varchar(100)",
      notNull: true,
    },
    appointment_date: {
      type: "date",
      notNull: true,
    },
    appointment_time: {
      type: "time",
      notNull: true,
    },
    service_description: {
      type: "text",
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

export const down = (pgm) => {
  pgm.dropTable("appointments");
};
