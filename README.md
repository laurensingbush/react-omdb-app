# OMDb Search

A MERN stack app that allows users to search the OMDb database for movies and shows. A successful search query will display up to 10 results in each category, with each result containing a modal to open for additional IMDb information. Users also have the option to create an account so they can add and remove items from their favorites list and view this list whenever they're logged in.

<img src="https://user-images.githubusercontent.com/43523243/128899921-53d52ec7-1636-43fb-a3e5-5893c634c443.png" alt="home" width="800">
<img src="https://user-images.githubusercontent.com/43523243/128899436-4b1437de-227a-46c5-8a10-617521a9f3e6.png" alt="favorites" width="800">

## Setup

Ensure you have `node` and `npm` installed on your system.

```terminal
$ node -v
$ npm -v
```

Clone the repository to your current working directory, and `cd movie-tv-app`

```terminal
$ git clone https://github.com/laurensingbush/react-omdb-app.git
```

### Client-side (PORT: 3000)

```terminal
$ cd client // go to client folder
$ npm install // install packages
$ npm start // start dev server
```

### Server-side (PORT: 5000)

#### Setup .env file

Create an .env file in root and add your own REACT_APP_OMDB_API_KEY, DATABASE, and JWT_SECRET environment variables.

#### Start

```terminal
$ cd ../ // if in client folder, go to root
$ npm install // install packages
$ npm start // start dev server
$ npm run dev // start both client and server
```

## Built with:

- [Create React App](https://github.com/facebook/create-react-app)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com)
- [MongoDB](https://www.mongodb.com/)
- [Open Movie Database API](http://www.omdbapi.com/)
