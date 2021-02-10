import React, {Component} from 'react';
import axios from 'axios';
import RNav from './RNav';

var ID,Applications,Positions,Deadline;

class RProfile extends Component {

    constructor(props) {
        super(props);
        ID=props.match.params.id

        const getdetails = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/jobs/${props.match.params.id}`);
                        Applications=res.data.applications;
                        Positions=res.data.positions;
                        Deadline=res.data.deadline;
                        // showdeadline=Date(Deadline).toString();
                } 
            catch (err) {
                // alert(err);
            }
            
        };
        getdetails();

        this.state = {
            applications: Applications,
            positions: Positions,
            deadline: Deadline
        }

        this.onChangeApplications = this.onChangeApplications.bind(this);
        this.onChangePositions = this.onChangePositions.bind(this);
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeApplications(event) {
        this.setState({ applications: event.target.value });
    }

    onChangePositions(event) {
        this.setState({ positions: event.target.value });
    }

    onChangeDeadline(event) {
      this.setState({ deadline: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
    
        const newUser = {
            applications: this.state.applications,
            positions: this.state.positions,
            deadline: this.state.deadline,
        }

        const postdetails = async () => {
            try {
                const response = await axios.get('http://localhost:4000/ids');
                try {
                        await axios.patch(`http://localhost:4000/jobs/${response.data[0].identity}`, newUser);
                        alert("Job Updated");
                        window.location.href='http://localhost:3000/activejob';       
                    } 
                catch (err) {
                    // alert(err);
                    }
                } 
            catch (err) {
                // alert(err);
            }
        };
        postdetails();

    }

    onDelete(e) {
        e.preventDefault();
    
        const deletejob = async() => {
            try {
                await axios.delete(`http://localhost:4000/jobs/${ID}`);
                alert("Job Deleted");
                window.location.href='http://localhost:3000/activejob';
            }
            catch (err){
                // alert(err);
            } 
        }
        deletejob();
    }

    render() {
        return (
            <div>
                <RNav/>
                <h1>Here are the details of the this job you created before</h1>
                <h3>Something wrong in this job? Update it!</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Maximum Number of Applicants: </label>
                        <input type="number" min={0}
                               className="form-control"
                               value={this.state.applications}
                               onChange={this.onChangeApplications}
                               />
                    </div>
                    <div className="form-group">
                        <label>Maximum Number of Positions: </label>
                        <input type="number" min={0}
                               className="form-control"
                               value={this.state.positions}
                               onChange={this.onChangePositions}
                               />
                    </div>
                    {/* <div className="form-group">
                        <label>Current Deadline for Application: </label>
                        <input type="text" readOnly
                               className="form-control"
                               value={showdeadline}
                               />
                    </div> */}
                    <div className="form-group">
                        <label>Deadline for Application: </label>
                        <input type="date"
                               className="form-control"
                               value={this.state.deadline}
                               onChange={this.onChangeDeadline}
                               />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary"/>
                    </div>
                    <br/>
                    <br/>
                {/* DELETE THE JOB */}
                </form>
                <form onSubmit={this.onDelete}>
                    <div className="form-group">
                        <input type="submit" value="Delete this job?" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default RProfile;