import express from "express";
import employeesRouter from "#api/employees";

const app = express();


app.use(express.json());


app.get("/", (_req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});


app.use("/employees", employeesRouter);


app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
