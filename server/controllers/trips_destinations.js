import { pool } from "../config/database.js";

// Step 12: Create a New Trip Destination
// POST /
const createTripDestination = async (req, res) => {
  try {
    const { trip_id, destination_id } = req.body;

    const results = await pool.query(
      `INSERT INTO trips_destinations (trip_id, destination_id)
       VALUES ($1, $2)
       RETURNING *`,
      [trip_id, destination_id]
    );

    res.status(201).json(results.rows[0]);
  }
  catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Step 12: Retrieve All Trip Destinations
// GET /
const getTripsDestinations = async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT * FROM trips_destinations ORDER BY trip_id ASC, destination_id ASC"
    );

    res.status(200).json(results.rows);
  }
  catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Step 12: Retrieve All Trips Associated with a Destination
// GET /trips/:destination_id
const getAllTrips = async (req, res) => {
  try {
    const destination_id = parseInt(req.params.destination_id);

    const results = await pool.query(
      `SELECT trips.*
       FROM trips
       JOIN trips_destinations
       ON trips.id = trips_destinations.trip_id
       WHERE trips_destinations.destination_id = $1
       ORDER BY trips.id ASC`,
      [destination_id]
    );

    res.status(200).json(results.rows);
  }
  catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Step 12: Retrieve All Destinations Associated with a Trip
// GET /destinations/:trip_id
const getAllDestinations = async (req, res) => {
  try {
    const trip_id = parseInt(req.params.trip_id);

    const results = await pool.query(
      `SELECT destinations.*
       FROM destinations
       JOIN trips_destinations
       ON destinations.id = trips_destinations.destination_id
       WHERE trips_destinations.trip_id = $1
       ORDER BY destinations.id ASC`,
      [trip_id]
    );

    res.status(200).json(results.rows);
  }
  catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Export All Trip Destination Functions
export default {
  createTripDestination,
  getTripsDestinations,
  getAllTrips,
  getAllDestinations
};