import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees";

const router = express.Router();

const isPositiveIntString = (s) => /^[1-9]\d*$/.test(String(s));

router.get("/", async (_req, res, next) => {
  try {
    const rows = await getEmployees();
    res.json(rows);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, birthday, salary } = req.body || {};
    if (!req.body) return res.status(400).json({ error: "Body required" });
    if (!name || !birthday || salary == null)
      return res.status(400).json({ error: "Missing required fields" });

    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).json(employee);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isPositiveIntString(id))
      return res.status(400).json({ error: "id must be a positive integer" });

    const employee = await getEmployee(Number(id));
    if (!employee) return res.status(404).json({ error: "Not found" });
    res.json(employee);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isPositiveIntString(id))
      return res.status(400).json({ error: "id must be a positive integer" });

    const deleted = await deleteEmployee(Number(id));
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isPositiveIntString(id))
      return res.status(400).json({ error: "id must be a positive integer" });

    const { name, birthday, salary } = req.body || {};
    if (!req.body) return res.status(400).json({ error: "Body required" });
    if (!name || !birthday || salary == null)
      return res.status(400).json({ error: "Missing required fields" });

    const updated = await updateEmployee({
      id: Number(id),
      name,
      birthday,
      salary,
    });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.status(200).json(updated);
  } catch (e) {
    next(e);
  }
});

export default router;
