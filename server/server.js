// Step 1: Set Up an Express Server
import express from 'express';
import cors from 'cors';

// Step 9: Import trip routes
import tripRoutes from './routes/trips.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">✈️ On the Fly API</h1>')
})

// Step 9: Specify the route for trips
app.use("/trips", tripRoutes);

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
})


