// Step 1: Set Up an Express Server
import express from 'express';
import cors from 'cors';

// Step 9: Import trip routes
import tripRoutes from './routes/trips.js';

// Step 12: Import activity routes
console.log("Registering activities routes");
import activityRoutes from "./routes/activities.js";

// Step 12: Import destination routes
import destinationRoutes from "./routes/destinations.js";

// Step 12: Import trips_destinations routes
import tripDestinationRoutes from "./routes/trips_destinations.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">✈️ On the Fly API</h1>')
})

// Step 9: Specify the route for trips
app.use("/trips", tripRoutes);

// Step 12: Specify the route for activities
app.use("/activities", activityRoutes);

// Step 12: Specify the route for destinations
app.use("/destinations", destinationRoutes);

// Step 12: Specify the route for trips_destinations
app.use("/trips_destinations", tripDestinationRoutes);

const PORT = process.env.PORT || 3001

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
})


