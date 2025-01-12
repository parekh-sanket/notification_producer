Notification Service
This is a Node.js-based notification service that integrates with Kafka, and MongoDB. Follow the steps below to set up and run the application.

Prerequisites
Before running the application, ensure you have the following services set up locally:

Kafka: Handles message queuing and processing.
MongoDB: Stores notification data and user preferences.

Setup Instructions
1. Configure Environment Variables
Navigate to the config folder in the project directory.
Open the development.json file and provide the required configurations.

2. Start Docker
Once the configuration is complete, you can start the Docker container with --network="host"

3. Usage
Ensure the prerequisite services (Kafka, MongoDB) are running on your local machine.
Access the application at http://localhost:9091.

Additional Notes
Kafka: Confirm the specified topic exists or configure the application to create it dynamically.
MongoDB: Ensure the database and collections are properly configured and accessible.