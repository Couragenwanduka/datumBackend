import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    host: process.env.host, 
    database: process.env.database,
    password: process.env.dbPassword,
    port: 5432, 
  });

export default pool