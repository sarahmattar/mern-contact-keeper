const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users', //references the collection
	},

	name: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
		unique: true,
	},

	phone: {
		type: Number,
	},
	type: {
		type: String,
		default: 'Personal',
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('contacts', ContactSchema);
