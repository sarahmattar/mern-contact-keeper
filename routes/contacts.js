const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

//data model
const User = require('../models/User');
const Contact = require('../models/Contact');

//@route    GET 'api/contacts'
//@desc     Get all user's contacts
//@access   Private

router.get('/', auth, async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({
			date: -1,
		});
		res.json(contacts);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

//@route    POST 'api/contacts'
//@desc     Add new contact
//@access   Private

router.post(
	'/',
	[
		[auth],
		[
			check('name', 'Name is required.')
				.not()
				.isEmpty(),
			check('email', 'Email is required')
				.not()
				.isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		const { name, email, phone, type } = req.body;
		try {
			const newContact = new Contact({
				name,
				email,
				phone,
				type,
				user: req.user.id,
			});
			const contact = await newContact.save();
			res.json(contact);
		} catch (error) {
			console.error(error.message);
			res.status(500).json({ msg: 'Contact not added to database.' });
		}
	}
);

//@route    PUT 'api/contacts/:id'
//@desc     Update a contact
//@access   Private

router.put('/:id', auth, async (req, res) => {
	const { name, email, phone, type } = req.body;

	//build the contactFields object for insertion
	const contactFields = {};

	if (name) contactFields.name = name;
	if (email) contactFields.email = email;
	if (phone) contactFields.phone = phone;
	if (type) contactFields.type = type;

	try {
		let contact = await Contact.findById(req.params.id);
		if (!contact) {
			return res.status(404).json({ msg: 'Contact Not Found' });
		}

		//make sure user owns contact
		if (contact.user.toString() !== req.user.id) {
			return res
				.status(401)
				.json({ msg: 'Not authorized to update contact.' });
		}

		contact = await Contact.findByIdAndUpdate(
			req.params.id,
			{ $set: contactFields },
			{ new: true }
		);

		res.json(contact);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

//@route    DELETE 'api/contacts/:id'
//@desc     Update a contact
//@access   Private

router.delete('/:id', auth, async (req, res) => {
	try {
		let contact = await Contact.findById(req.params.id);
		if (!contact) {
			return res.status(404).json({ msg: 'Contact Not Found' });
		}

		//make sure user owns contact
		if (contact.user.toString() !== req.user.id) {
			return res
				.status(401)
				.json({ msg: 'Not authorized to update contact.' });
		}

		await Contact.findByIdAndRemove(req.params.id);

		res.json({ msg: 'Contact Deleted' });
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
