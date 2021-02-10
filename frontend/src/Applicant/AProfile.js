import React, {Component} from 'react';
import axios from 'axios';
import ANav from './ANav';

var Name,Email,Education,Skills,Rating;

axios.get('http://localhost:4000/ids')
    .then( response => {
        axios.get(`http://localhost:4000/users/${response.data[0].identity}`)
            .then( res => {
                Name=res.data.name;
                Email=res.data.email;
                Education=res.data.education;
                Skills=res.data.skills;
                Rating=res.data.rating
            })
            .catch(function (error) {
                // alert(error);
            });
    });

class AProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: Name,
            email: Email,
            education: Education,
            skills: Skills,
            rating: Rating
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeEducation = this.onChangeEducation.bind(this);
        this.onChangeSkills = this.onChangeSkills.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeName(event) {
        this.setState({ name: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangeEducation(event) {
      this.setState({ education: event.target.value });
    }

    onChangeSkills(event) {
        this.setState({ skills: event.target.value });
    }

    onChangeRating(event) {
        this.setState({ rating: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
    
        var ind = document.getElementById("rating");
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            education: this.state.education,
            skills: this.state.skills,
            // rating: this.state.rating
            rating: ind.options[ind.selectedIndex].value
        }
        axios.get('http://localhost:4000/ids')
            .then( response => {
                axios.patch(`http://localhost:4000/users/applicant/${response.data[0].identity}`, newUser)
                    .then( (res) => {
                        //console.log(res);
                        alert("Profile Updated");
                        window.location.href='http://localhost:3000/applicant';
                    })
                    .catch(function (error) {
                        // alert(error);
                });
            });
    }

    render() {
        return (
            <div>
                <ANav/>
                <h2>Update your Profile to make it look even better :-))</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.name}
                               onChange={this.onChangeName}
                               />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />
                    </div>
                    <div className="form-group">
                        <label>Education: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.education}
                               onChange={this.onChangeEducation}
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
                    <h4>Rating</h4>
                    <select id="rating">
                        <option value="0" >0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3" selected>3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default AProfile;