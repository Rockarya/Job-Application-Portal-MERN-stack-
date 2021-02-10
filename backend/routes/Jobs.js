var express = require("express");
var router = express.Router();

// Load Job model
const Jobs = require("../models/Jobs");
const User = require("../models/Users");


//GET ALL JOBS UNDER RECRUITER
router.get('/:recruiterId/recruiters/alljobs', async (req,res) => {                         //async is written as a promising statement
    try {
        const jobid = await Jobs.find(
            {recruiterid : req.params.recruiterId}
        );      //await statement waits for the information to get extracted from the db
        res.json(jobid);
    } catch (err) {
        res.json({message : err});
    }
});

//GET ALL THE JOBS AVAILABLE
router.get('/', async (req, res) => {
    try{
        const jobs =  await Jobs.find();
        res.json(jobs);
    } catch (err) {
        res.json({message: err});
    }
});

//FIND A SPECIFIC JOB
router.get('/:jobId', async (req,res) => {                         //async is written as a promising statement
    try {
        const jobid = await Jobs.findById(req.params.jobId);      //await statement waits for the information to get extracted from the db
        res.json(jobid);
    } catch (err) {
        res.json({message : err});
    }
});

//POST A JOB BY RECRUITER      
router.post('/:recruiterId', async (req, res) => {
    const jobs = new Jobs({
        title: req.body.title,
        name: req.body.name,
        email: req.body.email,
        applications: req.body.applications,
        positions: req.body.positions,
        postingdate: req.body.postingdate,
        deadline: req.body.deadline,
        skills: req.body.skills,
        jobtype: req.body.jobtype,
        duration: req.body.duration,
        salary: req.body.salary,
        rating: req.body.rating,
        recruiterid: req.params.recruiterId
    });
    try {
        const savedJob = await jobs.save();
        res.json(savedJob);
    } catch (err) {
        res.json({message: err});
    }
});

//DELETE SPECIFIC JOB
router.delete('/:jobId', async (req,res) => {
    try {
        const removedjob = await Jobs.remove({_id : req.params.jobId});
        res.json(removedjob);
    } catch (err) {
        res.json({message : err});
    }
});

//DELETE ALL JOBS AT ONCE
router.delete('/', async (req,res) => {
    try {
        const removedjob = await Jobs.remove();
        res.json(removedjob);
    } catch (err) {
        res.json({message : err});
    }
});

//UPDATE A JOB BY RECRUITER :- Just write all the components doesn't matter you change their values or not
router.patch('/:recruiterId' , async (req,res) => {
    try {
        const updatedjob = await Jobs.updateOne(
            {recruiterid : req.params.recruiterId},
            {$set: {applications: req.body.applications, positions: req.body.positions, deadline: req.body.deadline}}
        );
        res.json(updatedjob);
    }
    catch (err) {
        res.json({message : err});
    }
});

//APPLICANT REGISTERS FOR A JOB
router.patch('/:jobId/:applicantId' , async (req,res) => {
    try {
        const updatedjob = await Jobs.updateOne(
            {_id : req.params.jobId},
            {$push: {applicantid: req.params.applicantId}}
        );
        const apply = await User.updateOne(
            {_id : req.params.applicantId},
            {$push: {jobids: req.params.jobId}}
        );
        res.json(updatedjob);
    }
    catch (err) {
        res.json({message : err});
    }
});


//GET ALL JOBS APPLICANT REGISTERD FOR
router.get('/:applicantId/applicants/alljobs', async (req,res) => {                        
    try {
        const jobid = await Jobs.find(
            {  applicantid : req.params.applicantId } 
        );     
        res.json(jobid);
    } catch (err) {
        res.json({message : err});
    }
});

module.exports = router;