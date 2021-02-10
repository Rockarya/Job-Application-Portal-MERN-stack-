import React, {Component} from 'react';
import axios from 'axios';
import RNav from './RNav';

var Name,Email,Contact,Bio;

axios.get('http://localhost:4000/ids')
    .then( response => {
        axios.get(`http://localhost:4000/users/${response.data[0].identity}`)
            .then( res => {
                Name=res.data.name;
                Email=res.data.email;
                Contact=res.data.contact;
                Bio=res.data.bio;
            })
            .catch(function (error) {
                // alert(error);
            });
    });

class RProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: Name,
            email: Email,
            contact: Contact,
            bio: Bio
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeName(event) {
        this.setState({ name: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangeContact(event) {
      this.setState({ contact: event.target.value });
    }

    onChangeBio(event) {
        this.setState({ bio: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
    
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            contact: this.state.contact,
            bio: this.state.bio
        }
        axios.get('http://localhost:4000/ids')
            .then( response => {
                axios.patch(`http://localhost:4000/users/recruiter/${response.data[0].identity}`, newUser)
                    .then( (res) => {
                        //console.log(res);
                        alert("Profile Updated");
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
                <h1>Update your profile to make applicants know more about you and your jobs!!!</h1>
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
                        <label>Contact: </label>
                        <input type="text" 
                               className="form-control"
                               value={this.state.contact}
                               onChange={this.onChangeContact}
                               />
                    </div>
                    <div className="form-group">
                        <label>Bio: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.bio}
                               onChange={this.onChangeBio}
                               />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default RProfile;