const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema({
	title: {
		type: String,
		required: true
    },
    name: {
        type: String,
        required: true
    },
	email: {
		type: String,
		required: true
    },
    applications : {            
        type: Number,
        required: true
    },
    positions : {
        type: Number,
        required: true
    },
    postingdate: {
        type: Date,
        required: false,
        default: Date.now
    },
    deadline: {             
        type: Date,
        required: true 
    },
	skills: {
        type: String,
        required: true
    },
    jobtype: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
    },
    applicantid: {
        type: [String]
    },
    recruiterid: {
        type: String,
        required: true
    }
});

module.exports=mongoose.model("Jobs", JobSchema);