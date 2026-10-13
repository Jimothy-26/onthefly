import express from "express";
import DestinationsController from "../controllers/destinations.js";

const router = express.Router();

// Retrieve All Destinations
router.get("/", DestinationsController.getDestinations);

// Retrieve a Destination by ID
router.get("/:id", DestinationsController.getDestination);

// Create a New Destination
router.post("/", DestinationsController.createDestination);

// Delete a Destination
router.delete("/:id", DestinationsController.deleteDestination);

// Update a Destination
router.patch("/:id", DestinationsController.updateDestination);

export default router;