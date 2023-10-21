const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// const pool = new Pool({
//   user: process.env.REACT_APP_DB_USERNAME,
//   host: process.env.REACT_APP_DB_HOST,
//   database: process.env.REACT_APP_DB_DATABASE,
//   password: process.env.REACT_APP_DB_PASSWORD,
//   port: process.env.REACT_APP_DB_PORT,
// });

const pool = new Pool({
  connectionString: process.env.DBConfigLink,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(bodyParser.json());

app.post("/api/matches", async (req, res) => {
  const { match } = req.body;
  try {
    const query = "INSERT INTO matches VALUES ($1)";
    await pool.query(query, [match]);
    res.status(201).send("Data inserted successfully");
  } catch (error) {
    console.error("Error occurred", error);
    res.status(500).send("Error occurred");
  }
});

app.post("/api/results", async (req, res) => {
  const { result } = req.body;
  try {
    const query = "INSERT INTO results VALUES ($1)";
    await pool.query(query, [result]);
    res.status(201).send("Data inserted successfully");
  } catch (error) {
    console.error("Error occurred", error);
    res.status(500).send("Error occurred");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
