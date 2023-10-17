# YouTube-subscribers

YouTube Subscribers Project

Overview:

This project is a simple web application that allows users to get YouTube subscribers. It consists of both front-end and back-end components.

Features:

Get all subscribers
Get subscribers by name
Get subscribers by ID
Add a new subscriber
View subscribers' details

Technologies Used:

HTML/CSS/JavaScript for the front-end
Node.js and Express.js for the back-end
MongoDB for the database

Setup:

Clone the repository to your local machine.
Install the necessary packages using npm install.
Start the server using npm start.
Open a web browser and navigate to http://localhost:3000 to access the application.

Usage:

Click the "Subscribers" button to get all subscribers.
Click the "Subscriber by Name" button to get subscribers by name.
Enter an ID in the input field and click the "Subscriber by ID" button to get a specific subscriber.
Fill out the form to add a new subscriber.

API Endpoints:

GET /subscribers - Get all subscribers
POST /subscribers - Add a new subscriber
GET /subscribers/name - Get subscribers by name
POST /subscribers/name - Add a new subscriber with name and subscribed channel only
GET /subscribers/:id - Get a subscriber by ID
POST /subscribers/:id - Add a new subscriber with provided name and subscribed channel, given an ID

Database Schema:

The database contains a collection of subscribers with the following fields:
name (String, required)
subscribedChannel (String, required)
subscribedDate (Date, default: current date)

How to Refresh Data:

To refresh the data in the database, run the refreshAll function from the index.js file. This function clears the existing data and inserts new data from the data.js file.

Contributors:
    
     [Poornima Pandey] 
 
     [Mohd Suaib Warsi]
