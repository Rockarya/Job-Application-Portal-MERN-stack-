const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		min: 4
	},
	email: {
		type: String,
		required: true,
		min: 4
	},
	role: {
		type: String,
		required: true
	},
	contact: {
		type: String,
		required: false
    },
   bio: {
       type: String,
	   required: false,
	   max: 250
   },
   password: {
		type: String,
		required: true,
		max: 1024,
		min: 4
	},
	education: {
		type: String,        
		required: false
	},
	skills: {
		type: String,
		required: false
	},
	rating: {
		type: String,
		required: false
	},
	jobids: {
		type: [String],
		required: false
	},
	sop:{
		type: String,
		required: false	
	}
});

module.exports=mongoose.model("Users", UserSchema);