import React, {Component} from 'react';
import axios from 'axios';
import RNav from './RNav';

var Name,Email;
axios.get('http://localhost:4000/ids')
    .then( response => {
        axios.get(`http://localhost:4000/users/${response.data[0].identity}`)
            .then( res => {
                Name=res.data.name;
                Email=res.data.email;
            })
            .catch(function (error) {
                // alert(error);
            });
    });

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            name: Name,
            email: Email,
            applications: null,
            positions: null,
            postingdate: Date.now(),
            deadline: null,
            skills: '',
            jobtype: '',
            duration: null,
            salary: null,
            rating: null
        }

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeApplications = this.onChangeApplications.bind(this);
        this.onChangePositions = this.onChangePositions.bind(this);
        this.onChangePostingDate = this.onChangePostingDate.bind(this);
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.onChangeSkills = this.onChangeSkills.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeTitle(event) {
        this.setState({ title: event.target.value });
    }
    
    onChangeApplications(event) {
        this.setState({ applications: event.target.value });
    }

    onChangePositions(event) {
      this.setState({ positions: event.target.value });
    }

    onChangePostingDate(event) {
        this.setState({ postingdate: event.target.value });
    }

    onChangeDeadline(event) {
        this.setState({ deadline: event.target.value });
    }

    onChangeSkills(event) {
        this.setState({ skills: event.target.value });
    }

    onChangeSalary(event) {
        this.setState({ salary: event.target.value });
    }

    onChangeDuration(event) {
        this.setState({ duration: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        var ind = document.getElementById("jobtype");
        var ind2 = document.getElementById("rating");
        const newUser = {
            title: this.state.title,
            name: this.state.name,
            email: this.state.email,
            applications: this.state.applications,
            positions: this.state.positions,
            postingdate: this.state.postingdate,
            deadline: this.state.deadline,
            skills: this.state.skills,
            jobtype: ind.options[ind.selectedIndex].value,
            duration: this.state.duration,
            salary: this.state.salary,
            rating: ind2.options[ind2.selectedIndex].value
        }

        axios.get('http://localhost:4000/ids')
            .then( response => {
                axios.post(`http://localhost:4000/jobs/${response.data[0].identity}`, newUser)
                    .then( res => {
                        console.log(res);
                        alert("Created job " + res.data.title);
                        window.location.href='http://localhost:3000/recruiter';
                    })
                    .catch(function (error) {
                        // alert(error);
                    });
            }); 
    }

    render() {
        return (
            <div>
                <RNav/>
                <h1>Create a Job to recruit applicants for :-)</h1>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.title}
                               onChange={this.onChangeTitle}
                               />
                    </div>
                    <div className="form-group">
                        <label>Applications: </label>
                        <input type="number" min={0} 
                               className="form-control"
                               value={this.state.applications}
                               onChange={this.onChangeApplications}
                               />
                    </div>
                    <div className="form-group">
                        <label>Positions: </label>
                        <input type="number" min={0} 
                               className="form-control"
                               value={this.state.positions}
                               onChange={this.onChangePositions}
                               />
                    </div>
                    <div className="form-group">
                        <label>Posting Date: </label>
                        <input type="date"  
                               className="form-control"
                               value={this.state.postingdate}
                               onChange={this.onChangePostingDate}
                               />
                    </div>
                    <div className="form-group">
                        <label>Deadline: </label>
                        <input type="date" 
                               className="form-control"
                               value={this.state.deadline}
                               onChange={this.onChangeDeadline}
                               />
                    </div>
                    <div className="form-group">
                        <label>Skills: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.skills}
                               onChange={this.onChangeSkills}
                               />
                    </div>
                    <div className="form-group">
                        <label>Salary: </label>
                        <input type="number" step={1000} min={0}
                               className="form-control"
                               value={this.state.salary}
                               onChange={this.onChangeSalary}
                               />
                    </div>
                    <div className="form-group">
                        <label>Duration in Months : </label>
                        <input type="number"  min={1} max={6}
                               className="form-control"
                               value={this.state.duration}
                               onChange={this.onChangeDuration}
                               />
                    </div>
                    <h4>Rating</h4>
                    <select id="rating">
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3} selected>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <br/>
                    <h4>Job Type</h4>
                    <select id="jobtype">
                        <option value="Full-Time" selected>Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Work-From-Home">Work-From-Home</option>
                    </select>
                    <br/>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Create" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}