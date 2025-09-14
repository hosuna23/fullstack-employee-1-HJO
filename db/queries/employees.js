import db from "#db/client";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  const SQL = `
    INSERT INTO employees (name, birthday, salary)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { rows: [employee] } = await db.query(SQL, [name, birthday, salary]);
  return employee;
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  const { rows } = await db.query(`SELECT * FROM employees ORDER BY id;`);
  return rows;
}

/** @returns the employee with the given id or undefined */
export async function getEmployee(id) {
  const { rows: [employee] } = await db.query(
    `SELECT * FROM employees WHERE id = $1;`,
    [id]
  );
  return employee;
}

/** @returns the updated employee with the given id or undefined */
export async function updateEmployee({ id, name, birthday, salary }) {
  const { rows: [employee] } = await db.query(
    `UPDATE employees
     SET name = $2, birthday = $3, salary = $4
     WHERE id = $1
     RETURNING *;`,
    [id, name, birthday, salary]
  );
  return employee;
}

/** @returns the deleted employee with the given id or undefined */
export async function deleteEmployee(id) {
  const { rows: [employee] } = await db.query(
    `DELETE FROM employees WHERE id = $1 RETURNING *;`,
    [id]
  );
  return employee;
}
