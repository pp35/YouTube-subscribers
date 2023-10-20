# YouTube Subscribers API Project

## Table of Contents
- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Data Refresh](#data-refresh)
- [Contributors](#contributors)

## Introduction
Welcome to the YouTube Subscribers API Project! This project is designed to provide a simple API for managing and retrieving information about YouTube subscribers. It allows you to perform operations such as getting a list of subscribers, adding new subscribers, and fetching subscriber details.

## Project Overview
The project consists of a Node.js application that serves as the backend for the API and a MongoDB database for storing subscriber data. The frontend is a basic HTML page that provides information about the available API endpoints.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Bootstrap (for frontend styling)
- Mongoose (for database interaction)

## Installation
To run this project on your local machine, follow these steps:

1. Clone the project repository from GitHub:
    ```
    git clone <repository-url>
    ```

2. Install the project dependencies by running:
    ```
    npm install
    ```

3. Ensure you have MongoDB installed and running on your local machine.

4. Start the application by running:
    ```
    node app.js
    ```
   The application will start and listen on port 3000. You can access the API through the provided endpoints.

## Usage
The API provides the following endpoints for managing YouTube subscribers:

### API Endpoints
- GET /subscribers: Get a list of all subscribers.
- POST /subscribers: Add a new subscriber.
- GET /subscribers/name: Get a list of subscribers with only the name and subscribedChannel fields.
- POST /subscribers/name: Add a new subscriber with name and subscribedChannel fields.
- GET /subscribers/:id: Get details of a subscriber by their ID.
- POST /subscribers/:id: Add a new subscriber by providing name and subscribedChannel.
  
  If a subscriber with the specified :id is not found, the API will return an error message with a status code of 400.

### Database
The project uses a MongoDB database to store subscriber data. You can configure the database connection in the app.js file. The database connection URL is set in the DATABASE_URL variable.

### Data Refresh
The project includes a data refresh feature. The `refreshAll` function in app.js clears the database and inserts a sample dataset of subscribers from the data.js file. You can use this function to reset the database with sample data.

## Contributors
- [Poornima Pandey]
- [Mohammad Suaib Warsi]
- [Ashutosh kumar]

Feel free to contribute to this project or use it as a starting point for your own YouTube subscribers management application. Enjoy exploring and using this API!
