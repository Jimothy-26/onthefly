import express from "express";
import ActivitiesController from "../controllers/activities.js";

const router = express.Router();

router.get("/check", (req, res) => {
  res.send("Activities router is working!");
});

// Retrieve Activities
router.get("/", ActivitiesController.getActivities);

// Retrieve Activities for a Specific Trip
router.get("/:trip_id", ActivitiesController.getTripActivities);

// Create a New Activity for a Trip
router.post("/:trip_id", ActivitiesController.createActivity);

// Delete an Activity
router.delete("/:id", ActivitiesController.deleteActivity);

// Update the Number of Votes for an Activity
router.patch("/:id", ActivitiesController.updateActivityLikes);

export default router;