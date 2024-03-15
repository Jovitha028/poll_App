// Importing  modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();

// Connect to MongoDB 
mongoose.connect('mongodb://localhost:27017/poll_APP', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Defining schemas
const partySchema = new mongoose.Schema({
  partyName: { type: String, maxlength: 100 },
  partyId: { type: String, maxlength: 50 },
  partyImage: {type:String},
  createdOn: { type: Date, default: Date.now },
});

const pollingSchema = new mongoose.Schema({
  partyName: String,
  EVId: String,
  votingId: String,
  polledOn: { type: Date, default: Date.now },
});

// Define models
const Party = mongoose.model('Party', partySchema);
const Polling = mongoose.model('Polling', pollingSchema);

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/api/party-registration', async (req, res) => {
  try {
    const { partyName, partyId, partyImage } = req.body;
    const party = new Party({ partyName, partyId, partyImage });
    await party.save();
    res.status(201).json(party);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/api/voting-pallet', async (req, res) => {
  try {
    const { partyName, EVId, votingId } = req.body;
    const polling = new Polling({ partyName, EVId, votingId });
    await polling.save();
    res.status(201).json(polling);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.get('/api/final-results', async (_req, res) => {
  try {
    const results = await Polling.find().limit(50);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
