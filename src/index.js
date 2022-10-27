const express = require("express");
const cors = require("cors");
const dbConfig = require("./db.config");

require("dotenv").config();


const app = express();

//json middleware
app.use(express.json());

//cors middleware
app.use(cors());

//Get connection Promise
const promisePool = dbConfig();

//get alll the users from the db
app.get("/", async (req, res) => {
  try {
    let [rows, _] = await promisePool.query(`SELECT * FROM ${process.env.TABLE_NAME}`); //returns  the resultSet and the fields set

    res.status(200).json({ message: "Fetched successfully", ok: true, rows });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch", ok: false, error: error.message });
  }
});

//get a single user
app.get("/:id", async (req, res) => {
  try {
    let [rows, _] = await promisePool.query(
      `SELECT * FROM ${process.env.TABLE_NAME} WHERE id=${req.params.id}`
    );

    res
      .status(200)
      .json({ message: "Fetched successfully", ok: true, user: rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch", ok: false, error: error.message });
  }
});

//add users to the db
app.post("/", async (req, res) => {
  try {
    const result = await promisePool.query(
      `INSERT INTO ${process.env.TABLE_NAME}(name, email, age) VALUES(?, ?, ?)`,
      Object.values(req.body)
    );

    res.status(201).json({ message: "Created successfully", ok: true, result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create", ok: false, error: error.message });
  }
});

//update user
app.put("/:id", async (req, res) => {
  try {
    let result = await promisePool.query(
      `UPDATE ${process.env.TABLE_NAME} SET name = ?, email = ?, age = ? WHERE id=${req.params.id}`,
      Object.values(req.body)
    );

    res.status(200).json({ message: "Updated successfully", ok: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update", ok: false, error: error.message });
  }
});

//delete user
app.delete("/:id", async (req, res) => {
  try {
    let result = await promisePool.query(
      `DELETE FROM ${process.env.TABLE_NAME} WHERE id=${req.params.id}`
    );

    res.status(200).json({ message: "Deleted successfully", ok: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete", ok: false, error: error.message });
  }
});


app.listen(process.env.PORT, () =>
  console.log(`App running on port ${process.env.PORT}`)
);
