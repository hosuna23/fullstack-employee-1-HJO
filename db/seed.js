import db from "#db/client";


export async function seedEmployees() {
  
  await db.query(`TRUNCATE employees RESTART IDENTITY CASCADE;`);

  const employees = [
    { name: "Alice Johnson",   birthday: "1990-01-15", salary: 70000 },
    { name: "Brian Lee",       birthday: "1987-03-22", salary: 68000 },
    { name: "Carla Martinez",  birthday: "1995-07-09", salary: 72000 },
    { name: "Derrick Wong",    birthday: "1992-11-02", salary: 65000 },
    { name: "Eve Thompson",    birthday: "1989-05-30", salary: 81000 },
    { name: "Farah Khan",      birthday: "1993-12-18", salary: 69000 },
    { name: "George Smith",    birthday: "1985-09-10", salary: 88000 },
    { name: "Hanna Nguyen",    birthday: "1998-02-27", salary: 64000 },
    { name: "Isaac Cohen",     birthday: "1991-08-14", salary: 73000 },
    { name: "Julia Roberts",   birthday: "1994-04-05", salary: 70500 },
    { name: "Jesus Aguirre",   birthday: "1995-06-12", salary: 81600 },
    { name: "Hector Osuna",   birthday: "1993-11-10", salary: 200000 },
  ];

  const SQL = `INSERT INTO employees (name, birthday, salary) VALUES ($1, $2, $3);`;
  for (const e of employees) {
    await db.query(SQL, [e.name, e.birthday, e.salary]);
  }
}


export async function runSeed() {
  await db.connect();
  await seedEmployees();
  await db.end();
  console.log("🌱 Database seeded.");
}


if (process.env.NODE_ENV !== "test") {
  await runSeed();
}
