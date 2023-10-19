// Import necessary libraries and modules
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../app'); // Import your Express app
const Subscriber = require('../models/subscribers'); // Import your Mongoose model

// Configure Chai and set an expectation object
chai.use(chaiHttp);
const expect = chai.expect;

// Define the URI for the test database
const testDBUri = 'mongodb://localhost:27017'; // Replace with your test database URI

// Set up before and after hooks for database setup and cleanup
before(async () => {
  await mongoose.connect(testDBUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

after(async () => {
  // Drop the test database and close the database connection after tests
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

// Begin describing the test suite for the Subscriber API
describe('Subscriber API', () => {

  // Test case for the GET /subscribers endpoint
  describe('GET /subscribers', () => {
    it('should get all subscribers', (done) => {
      // Make a GET request to the endpoint and assert the response
      chai
        .request(app)
        .get('/subscribers')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done(); // Indicate that the test is complete
        });
    });
  });

  // Test case for the POST /subscribers endpoint
  describe('POST /subscribers', () => {
    it('should create a new subscriber', (done) => {
      // Prepare data for a new subscriber
      const newSubscriber = {
        name: 'Test User',
        subscribedChannel: 'Test Channel',
      };

      // Make a POST request to the endpoint and assert the response
      chai
        .request(app)
        .post('/subscribers')
        .send(newSubscriber)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('name', 'Test User');
          expect(res.body).to.have.property('subscribedChannel', 'Test Channel');
          done(); // Indicate that the test is complete
        });
    });
  });

  // Additional test cases for other API endpoints can be added here

  // Test case for GET /subscribers/name endpoint
  describe('GET /subscribers/name', () => {
    it('should get all subscribers', (done) => {
      // Make a GET request to the endpoint and assert the response
      chai
        .request(app)
        .get('/subscribers/name')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  // Test case for POST /subscribers/name endpoint
  describe('POST /subscribers/name', () => {
    it('should create a new subscriber with a name and subscribed channel', (done) => {
      // Prepare data for a new subscriber
      const newSubscriber = {
        name: 'Test User',
        subscribedChannel: 'Test Channel',
      };

      // Make a POST request to the endpoint and assert the response
      chai
        .request(app)
        .post('/subscribers/name')
        .send(newSubscriber)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('name', 'Test User');
          expect(res.body).to.have.property('subscribedChannel', 'Test Channel');
          // You can add more assertions based on your expected response
          done();
        });
    });
  });

  // More test cases for other endpoints can be added here

  // Test case for GET /subscribers/:id endpoint
  describe('GET /subscribers/:id', () => {
    it('should get a subscriber by their ID', (done) => {
      // Create a new subscriber in the database (replace with a valid ID)
      const newSubscriber = new Subscriber({
        name: 'Test User',
        subscribedChannel: 'Test Channel',
      });
      newSubscriber.save((err, savedSubscriber) => {
        if (err) return done(err);

        // Make a GET request to the endpoint with the ID of the saved subscriber
        chai
          .request(app)
          .get(`/subscribers/${savedSubscriber._id}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Test User');
            expect(res.body).to.have.property('subscribedChannel', 'Test Channel');
            // You can add more assertions based on your expected response
            done();
          });
      });
    });

    it('should handle an invalid subscriber ID', (done) => {
      const invalidId = 'invalid-id'; // An invalid ID
      // Make a GET request to the endpoint with an invalid ID and assert the response
      chai
        .request(app)
        .get(`/subscribers/${invalidId}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message', 'Subscriber not found');
          done();
        });
    });
  });

  });





// Run the tests
describe('Run Subscriber API Tests', () => {
  it('should run all tests', (done) => {
    done();
  });
});