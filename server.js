const express = require('express');

const connectDb = require('./config/db');

//Connect Database
connectDb();

//initialize express
const app = express();
const PORT = process.env.PORT || 5000;

//initialize middleware
app.use(express.json({ extended: false }));

//Define our routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.get('/', (req, res) => {
	res.json({ msg: 'Welcome to the Contact Keeper API!' });
});

app.listen(PORT, () => {
	console.log(`Server is up on port ${PORT}.`);
});
