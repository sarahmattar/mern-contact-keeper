# mern-contact-keeper
This is a simple contact keeper app built from scratch using the MERN stack. It is a coursework app from Brad Traversy's UDEMY course, [Modern React Front to Back](https://www.udemy.com/course/modern-react-front-to-back/). 

While I have had bits and pieces of experience will the technologies listed below, this app tutorial has taught me a lot about how to create an app from scratch, and gave the opportunity to learn more about how to properly implement Hooks and Context with React. 

### Technologies and APIs Used

[MongoDB Cloud Atlas](https://www.mongodb.com/cloud/atlas) - a NoSQL database storage solution

[Mongoose](https://mongoosejs.com/) - a conduit for connecting to MongoDB and creating schemas for data

[Node.js](https://nodejs.org/) - a Javascript based runtime

[Express](https://expressjs.com/) - custom creation and serving of API endpoints

[Axios](https://github.com/axios/axios) - HTTP requests to custom API endpoints

[JSON Web Tokens](https://jwt.io/), Bcrypt - the creation and assignment of a web token to a user upon registration or login. 

[Concurrently](https://www.npmjs.com/package/concurrently) - a framework which allows a client side application (React) and a server side application (Node) to run in tandem with one another for development purposes. 

[React](https://reactjs.org/)/[React-Router](https://www.npmjs.com/package/react-router) - a fully interactive front end designed to make use of hooks and context. Three separate React Contexts have been created for: 

  1. Accessing the contacts API
  2. Registering & Authenticating a User
  3. A system of alerts to notify the user when something has gone wrong 

### Instructions for Installation

Installing the application requires Node.js and Nodemon to be installed. To launch the server and client via Concurrently: 

`npm run dev` 

