import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import RNav from './RNav';

function Activejob() {

    useEffect(() => {
        fetchUsers();
    },[]);

    const [job, setjobs] = useState([]);

    const fetchUsers = async () => {

        const temp = await fetch('http://localhost:4000/ids');
        const idata = await temp.json();
        const data = await fetch (`http://localhost:4000/jobs/${idata[0].identity}/recruiters/alljobs`);
        const jobs = await data.json();

        setjobs(jobs);
    };

  return (
    <div class="table-responsive">
        <RNav/>
        <h1>These are the list of jobs posted by you!</h1>
        <h3>Click on them to edit/delete the job</h3>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                {/* <th scope="col">#</th> */}
                <th scope="col">Title</th>
                <th scope="col">Date of Posting</th>
                <th scope="col">Deadline</th>
                <th scope="col">Number of Applicants</th>
                <th scope="col">Maximum Number of Positions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>{job.map(vals => (<h2 key={vals._id}> <Link to={`/edit_delete_job/${vals._id}`}> {vals.title} </Link> </h2>))}</td>
                <td>{job.map(vals => (<h2 key={vals._id}> {vals.postingdate} </h2>))}</td>
                <td>{job.map(vals => (<h2 key={vals._id}> {vals.deadline} </h2>))}</td>
                <td>{job.map(vals => (<h2 key={vals._id}> {vals.applications} </h2>))}</td>
                <td>{job.map(vals => (<h2 key={vals._id}> {vals.positions} </h2>))}</td>
                </tr>
            </tbody>
        </table>
    </div>
  );
}

export default Activejob;