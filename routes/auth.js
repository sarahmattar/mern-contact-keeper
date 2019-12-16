const express = require('express');
const router = express.Router();

//@route    GET 'api/auth'
//@desc     Get logged in user
//@access   Private
router.get('/', (req, res) => {
	res.send('Get a logged in user');
});

//@route    GET 'api/auth'
//@desc     Authenticate user and get token
//@access   Public
router.post('/', (req, res) => {
	res.send('Authenticate User');
});

module.exports = router;
