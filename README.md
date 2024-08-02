# The Literary Lounge

The Literary Lounge is an application dedicated to book enthusiasts and book clubs. Users can search for books, join book clubs, and maintain a profile of their favorite books and clubs.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Helpful Resources](#helpful-resources)
- [Contributors](#contributors)
- [License](#license)

## Features
- Book Search: Utilize the Open Library API to search for books.
- User Authentication: Sign up, log in, and manage profiles.
- Book Clubs: Join and participate in book clubs.
- Profile Management: Save favorite books and manage book clubs in user profiles.

## Technologies Used
- Frontend: React, Chakra UI
- Backend: Node.js, Express.js
- Database: MongoDB (via Mongoose), SQL
- API: Open Library API for book search

## Installation
To get a local copy up and running, follow these steps.

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running
- SQL database set up

### Steps

1. Clone the repository:

2. Copy code
- git clone https://github.com/deepblueseas/Project-3
3. cd the-literary-lounge
4. Install the dependencies:
- Copy code
- npm install
5. Set up environment variables. Create a .env file in the root directory and add the following:

* env
* Copy code
* MONGODB_URI=mongodb://localhost:27017/yourDatabaseName
* SQL_DB_URL=your_sql_database_url
* JWT_SECRET=your_jwt_secret

6. Start the backend server:

* Copy code
* npm run server

7. Navigate to the client directory and start the frontend server:

* Copy code
* cd client
* npm install
* npm start

## Usage
- Navigate to http://localhost:3000 in your browser.
- Sign up for an account.
- Log in to access your profile, search for books, and join book clubs.

## API

The Literary Lounge uses the Open Library API to search for books. Below is an example of how to interact with the API.

- Search for Books
- Endpoint: GET /api/books/search?q=searchQuery

## Helpful Resources
- ![Open Library API Docs](https://openlibrary.org/dev/docs/api/search)
- ![Chakra UI](https://v2.chakra-ui.com/)

## Contributors

- [Tess McGovern](https://github.com/deepblueseas)
- [Rachel Vanetta](https://github.com/rvanetta97)
- [Dominic DeCapite](https://github.com/domdecap)
- [Fred Duncan](https://github.com/duncanfd24)
- [Garrett Britton](https://github.com/GarrettBritton)

## License
- [MIT](https://choosealicense.com/licenses/mit/)
