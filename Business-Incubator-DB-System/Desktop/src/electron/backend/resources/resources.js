import pool from '../../config/database.js';

export const getAllResources = async () => {
  const res = await pool.query('SELECT * FROM resources ORDER BY created_at DESC');
  return res.rows;
};

export const addResource = async (data) => {
  const { name, type, capacity, location } = data;
  const res = await pool.query(
    'INSERT INTO resources (name, type, capacity, location) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, type, capacity, location]
  );
  return res.rows[0];
};

export const getPendingBookings = async () => {
  const res = await pool.query(`
    SELECT b.*, r.name as resource_name, r.type 
    FROM resource_bookings b
    JOIN resources r ON b.resource_id = r.id
    WHERE b.status = 'pending'
    ORDER BY b.created_at ASC
  `);
  return res.rows;
};

export const updateBookingStatus = async ({ id, status }) => {
  const res = await pool.query(
    'UPDATE resource_bookings SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );
  return res.rows[0];
};

export const getResourceStats = async () => {
  const res = await pool.query(`
    SELECT project_name, COUNT(*) as bookings_count 
    FROM resource_bookings 
    WHERE status = 'approved' 
    GROUP BY project_name
  `);
  return res.rows;
};