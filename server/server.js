// Step 1: Set Up an Express Server
import express from 'express';
import cors from 'cors';

//Create Express app
const app = express();

//Use middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">✈️ On the Fly API</h1>')
})

app.use("/trips", tripRoutes);

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
})


