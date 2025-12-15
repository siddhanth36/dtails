"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var pool = new pg_1.Pool({
    host: "localhost",
    port: 5432,
    database: "dtales_db",
    user: "dtales_admin",
    password: "StrongPassword123",
});
pool.on("connect", function () {
    console.log("🐘 PostgreSQL connected");
});
exports.default = pool;
