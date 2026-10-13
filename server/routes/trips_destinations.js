import express from "express";
import TripsDestinationsController from "../controllers/trips_destinations.js";

const router = express.Router();

// Retrieve All Trip Destination Relationships
router.get("/", TripsDestinationsController.getTripsDestinations);

// Retrieve All Trips Associated with a Destination
router.get("/trips/:destination_id", TripsDestinationsController.getAllTrips);

// Retrieve All Destinations Associated with a Trip
router.get("/destinations/:trip_id", TripsDestinationsController.getAllDestinations);

// Create a New Trip Destination Relationship
router.post("/", TripsDestinationsController.createTripDestination);

export default router;