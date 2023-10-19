// // Import required modules
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();


// Import required modules
const Subscriber = require('./models/subscribers'); // Import the Subscriber model

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route to serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

/**
 * @swagger
 * /subscribers:
 *   get:
 *     summary: Get all subscribers
 *     description: Retrieve a list of all subscribers.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - _id: 1
 *                 name: John Doe
 *                 subscribedChannel: Channel A
 *   post:
 *     summary: Create a new subscriber.
 *     description: Create a new subscriber.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               subscribedChannel:
 *                 type: string
 *     responses:
 *       201:
 *         description: Subscriber created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
app.get('/subscribers', async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/subscribers', async (req, res) => {
  try {
    const { name, subscribedChannel } = req.body;

    if (!name || !subscribedChannel) {
      return res.status(400).json({ message: 'Name and subscribedChannel are required.' });
    }

    const newSubscriber = new Subscriber({ name, subscribedChannel });
    await newSubscriber.save();

    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * @swagger
 * /subscribers/name:
 *   get:
 *     summary: Get subscribers' names and subscribed channels.
 *     description: Retrieve a list of subscribers' names and their subscribed channels.
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 *   post:
 *     summary: Create a new subscriber's name and subscribed channel.
 *     description: Create a new subscriber's name and their subscribed channel.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               subscribedChannel:
 *                 type: string
 *     responses:
 *       201:
 *         description: Subscriber created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
app.get('/subscribers/name', async (req, res) => {
  try {
    const subscribers = await Subscriber.find().select('name subscribedChannel -_id');
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/subscribers/name', async (req, res) => {
  try {
    const { name, subscribedChannel } = req.body;
    
    if (!name || !subscribedChannel) {
      return res.status(400).json({ message: 'Name and subscribedChannel are required.' });
    }

    const newSubscriber = new Subscriber({ name, subscribedChannel });
    await newSubscriber.save();

    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * @swagger
 * /subscribers/{id}:
 *   get:
 *     summary: Get a subscriber by their ID.
 *     description: Retrieve a subscriber's information by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the subscriber to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Subscriber not found
 *   post:
 *     summary: Create a subscriber with a specific ID.
 *     description: Create a new subscriber with the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID for the new subscriber.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               subscribedChannel:
 *                 type: string
 *     responses:
 *       201:
 *         description: Subscriber created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
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

app.post('/subscribers/:id', async (req, res) => {
  try {
    const { name, subscribedChannel } = req.body;
    const id = req.params.id;

    if (!name || !subscribedChannel) {
      return res.status(400).json({ message: 'Both name and subscribedChannel are required.' });
    }

    // Create a new subscriber with the provided ID
    const newSubscriber = new Subscriber({ _id: id, name, subscribedChannel });
    await newSubscriber.save();

    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Swagger configuration
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Subscriber API',
    version: '1.0.0',
    description: 'API for managing subscribers',
  },
  servers: [
    {
      url: 'https://get-youtube-subscribers-40mk.onrender.com/' 
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['app.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// Serve Swagger documentation using Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



module.exports = app;