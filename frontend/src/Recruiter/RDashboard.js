import React, {useState, useEffect} from 'react';
import './Recruiter.css';
import {Link} from 'react-router-dom';
import RNav from './RNav';

function RDashboard() {

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
    <div>
        <RNav/>
        <h1>These are the list of jobs you created so for!</h1>
        <h3>Click on them to see who and how many registered :-)</h3>
      {job.map(vals => (
            <h1 key={vals._id}> 
            <Link to={`/applicantdetails/${vals._id}`}> {vals.title} </Link>   
             </h1>
      ))}
    </div>
  );
}

export default RDashboard;