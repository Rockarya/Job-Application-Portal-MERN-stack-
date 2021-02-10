import React, {Component} from 'react';
import axios from 'axios';
import ANav from './ANav';


var JOBID,Title,Recruiter_name,Rating,Salary,Duration,Deadline,Applicantids=[]
//RID is recruiter id which will be used to get the name of the recruiter who posted it 

class ApplyJob extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonText: "Applied"
        }
        JOBID=props.match.params.id

        const getdetails = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/jobs/${props.match.params.id}`);
                        Title=res.data.title;
                        Rating=res.data.rating;
                        Salary=res.data.salary;
                        Duration=res.data.duration;
                        Deadline=Date(res.data.deadline).toString();
                        Applicantids=res.data.applicantid;

                        //checking if the applicant has applied forthis job earlier or not
                        axios.get('http://localhost:4000/ids')
                        .then((respo) => {
                            var ind=Applicantids.indexOf(respo.data[0].identity);
                            if(ind === -1)
                            {
                                //not applied yet
                                this.setState({buttonText: "Apply"});
                            }
                        });

                        try
                        {
                            const response = await axios.get(`http://localhost:4000/users/${res.data.recruiterid}`);
                            Recruiter_name=response.data.name;
                        }
                        catch (err) {
                            // alert(err);
                        }
                } 
            catch (err) {
                // alert(err);
            }
            
        };
        getdetails();

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const applyjob = async () => {
            try {
                const response = await axios.get('http://localhost:4000/ids');
                try {
                        await axios.patch(`http://localhost:4000/jobs/${JOBID}/${response.data[0].identity}`);
                        alert("You have applied for this job succesfully!\nWrite a SOP to recruiter");
                        window.location.href=`http://localhost:3000/sop/${JOBID}`;       
                    } 
                catch (err) {
                    // alert(err);
                    }
                } 
            catch (err) {
                // alert(err);
            }
        };
        if(this.state.buttonText === "Apply")
        {
            axios.get('http://localhost:4000/ids')
            .then((respo) => {
                axios.get(`http://localhost:4000/jobs/${respo.data[0].identity}/applicants/alljobs`)
                .then((res) => {
                    if(res.data.length >= 10)
                    {
                        alert("It seems like that you have exceeded the limit to apply for open jobs\nYou can't apply anymore :-(");
                        window.location.href='http://localhost:3000/adashboard';
                    }
                    else{
                        applyjob();
                    }
                });
            });
        }
        else
        {
            alert("Already Applied");
        }
    }

    render() {
        return (
            <div>
                <ANav/>
                <h1>Details of {Title} job you are looking for</h1>
                <h3>Apply for this Job if you find it Intersting :-)</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text" readOnly
                               className="form-control"
                               value={Title}
                               />
                    </div>
                    <div className="form-group">
                        <label>Recruiter Name: </label>
                        <input type="text" readOnly
                               className="form-control"
                               value={Recruiter_name}
                               />
                    </div>
                    <div className="form-group">
                        <label>Rating: </label>
                        <input type="number" readOnly
                               className="form-control"
                               value={Rating}
                               />
                    </div>
                    <div className="form-group">
                        <label>Salary: </label>
                        <input type="number" readOnly
                               className="form-control"
                               value={Salary}
                               />
                    </div>
                    <div className="form-group">
                        <label>Duration in months: </label>
                        <input type="number" readOnly
                               className="form-control"
                               value={Duration}
                               />
                    </div>
                    <div className="form-group">
                        <label>Deadline: </label>
                        <input type="text" readOnly
                               className="form-control"
                               value={Deadline}
                               />
                    </div>
                    <div className="form-group">
                        <input type="submit" value={this.state.buttonText} className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default ApplyJob;