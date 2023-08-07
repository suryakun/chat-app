Certainly! Here's a template for the README file that addresses all the sections and questions you've provided:

---

# Submission for Surya

## Date of Submission
7th August 2023

## Instructions to Run Assignment Locally
To run this solution locally, you can use Docker Compose. Follow these steps:

1. Clone this repository.
2. Navigate to the repository's root directory.
3. Make sure you have Docker and Docker Compose installed on your machine.
4. Open a terminal and run the following command to start the services:
   ```
   docker-compose up
   ```
5. Open your web browser and access the application:
   - NestJS app: http://localhost:5000
   - Vite (React) app: http://localhost:3000

## Time Spent
I spent approximately 8 hours on this assignment.

## Assumptions Made
I made the following assumptions while creating the solution:
- The authentication based on the username, which username has to be unique and not contains spaces.
- The room ID also used for room verification.
- User initially can see 50 last messages

## Shortcuts/Compromises Made
I made the following shortcuts/compromises that could have been done better in a real-world application:
- User can see the last 50 messages. It can be enhace by using pagination both on client and backend side
- I store the authentication in localStorage which only contain userID and password. It can be enhance by use common JWT authentication with username and room id payload

## Assume Your Application Will Go into Production...
### Ensuring Application Readiness for Production (Testing):
I added the unit testing for frontend and backend side. But the tests limited to the core functionalities.

### Ensuring Smooth User Experience with Simultaneous Users:
To handle multiple users, the user will join to the specific room. Client side will connecting websocket to the backend side base on the roomID. Once any message added, server will send the added message to the specific room and only users inside the room will receive the update.

### Ensuring Application Security:
Once the user login to the room with username and roomId, the backend will check whether the user is exist or not. If the user doesn't exits it will login successfully and store the data to localStorage. The userID and roomID in the localStorage will be used to do request to the backend.

## What I Did Not Include in the Solution
The requirements have been fullfilled.

## Other Information
Please use Nodejs 18 to use this app

## Feedback on This Technical Challenge
The task is quite clear and simple.

---

Feel free to fill in the sections with relevant information based on your implementation. This README will provide a clear overview of your submission and thought process.