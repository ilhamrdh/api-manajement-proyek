import { Sequelize } from "sequelize";

const db = new Sequelize("test", "postgres", "secret", {
    host: "127.0.0.1",
    dialect: "postgres",
});

export default db;
