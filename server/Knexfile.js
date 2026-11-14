require("dotenv").config();

module.exports = {
    development: {
        client: "mysql2",

        connection: {
            host: process.env.DB_HOST || "localhost",
            port: Number(process.env.DB_PORT) || 3306,
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_NAME || "mandi_connects",
            ssl: process.env.DB_SSL === "true" ? {} : undefined
        },

        migrations: {
            directory: "./migrations",
            tableName: "knex_migrations"
        }
    },

    production: {
        client: "mysql2",

        connection: {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT) || 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: process.env.DB_SSL === "true" ? {} : undefined
        },

        migrations: {
            directory: "./migrations",
            tableName: "knex_migrations"
        }
    }
};