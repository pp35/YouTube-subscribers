// Import required modules
const express = require('express');
const app = express();
const Subscriber = require('./models/subscribers'); // Import the Subscriber model

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route to serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Route to get all subscribers
app.get('/subscribers', async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new subscriber
app.post('/subscribers', async (req, res) => {
  try {
    const newSubscriber = new Subscriber(req.body);
    const savedSubscriber = await newSubscriber.save();
    res.status(201).json(savedSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get subscribers' names and subscribed channels
app.get('/subscribers/name', async (req, res) => {
  try {
    const subscribers = await Subscriber.find().select('name subscribedChannel -_id');
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new subscriber with a name and subscribed channel
app.post('/subscribers/name', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedChannel: req.body.subscribedChannel
  });

  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get a subscriber by their ID
app.get('/subscribers/:id', async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (!subscriber) {
      return res.status(400).json({ message: 'Subscriber not found' });
    }
    res.json(subscriber);
  } catch (err) {
    res.status(400).json({ message: 'Subscriber not found' });
  }
});

// Route to create a new subscriber with a specified ID
app.post('/subscribers/:id', async (req, res) => {
  const { name, subscribedChannel } = req.body;

  if (!name || !subscribedChannel) {
    return res.status(400).json({ message: 'Both name and subscribedChannel are required' });
  }

  const newSubscriber = new Subscriber({
    name,
    subscribedChannel
  });

  try {
    const savedSubscriber = await newSubscriber.save();
    res.status(201).json(savedSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// Export the Express app
module.exports = app;