// Required Imports
const express = require('express');
const app = express();
const cors = require('cors'); // Fix typo here
const mongoose = require('mongoose');

const MongoDBUrl = 'mongodb://127.0.0.1:27017/leaderboard';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Database Connection
async function connectToDatabase() {
  try {
    await mongoose.connect(MongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Terminate the application on database connection error
  }
}

connectToDatabase();

// Data Model Schemas
const gameSchema = new mongoose.Schema({
  teamNames: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }]
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  points: { type: Number, default: 0 }
});

const GameModel = mongoose.model('gameInfo', gameSchema);
const TeamModel = mongoose.model('teamInfo', teamSchema);

// Routes
app.post('/createGame', async (req, res) => {
    try {
        const { teamNames } = req.body;
        const teamIds = [];

        for (const name of teamNames) {
            const newTeam = new TeamModel({ name });
            await newTeam.save();
            teamIds.push(newTeam._id);
        }

        const newGame = new GameModel({ teamNames: teamIds });
        await newGame.save();

        res.status(201).json({
            id: newGame._id
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/gamedetails/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const Game = await GameModel.findOne({ _id: id });
    const teamscores = [];
    for (const id of Game.teamNames) {
      const teamdetails = await TeamModel.findOne({ _id: id });
      teamscores.push(teamdetails);
    }
    res.status(200).json({
      teamscores
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/teamdetails/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const Team = await TeamModel.findOne({ _id: id });
    res.status(200).json({
      Team
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/updateteam', async (req, res) => {
  try {
    const { id, points } = req.body;
    const Team = await TeamModel.findOne({ _id: id });
    Team.points = points;
    await Team.save();
    res.status(200).json({
      message: 'Successfully Updated'
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = 8005;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
