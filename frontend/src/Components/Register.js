import React, {Component} from 'react';
import axios from 'axios';

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            role: ''
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeName(event) {
        this.setState({ name: event.target.value });
    }
    
    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
      this.setState({ password: event.target.value });
  }

    onSubmit(e) {
        e.preventDefault();

        var ind = document.getElementById("role");
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role: ind.options[ind.selectedIndex].value 

        }

        const registerhere = async () => {
            try {
                    const res = await axios.post('http://localhost:4000/api/user/register', newUser);
                    if(res.status === 200)
                    {
                        alert("Created user " + res.data.name + "\nRedirecting to Login page :-)")
                        window.location.href='http://localhost:3000/login'
                    }
                    if(res.status === 205)
                    {
                        alert("Ensure that email id is valid\nName,Email and Password must be atleast 4 characters long");
                    }
                    if(res.status === 204)
                    {
                        alert("Email already exists!");
                    }
                } 
            catch (err) {
                //  alert(err);
            }    
        };
        registerhere();
    }

    render() {
        return (
            <div>
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
                        <label>Password: </label>
                        <input type="password"
                               className="form-control"
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />
                    </div>
                    <h4>Select Your Role</h4>
                    <select id="role">
                        <option value="applicant" selected>Applicant</option>
                        <option value="recruiter">Recruiter</option>
                    </select>
                    <br/>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary"/>
                    </div>
                    <h5>Already registered!</h5>
                    <a href="http://localhost:3000/login">Login Here</a>
                </form>
            </div>
        )
    }
}