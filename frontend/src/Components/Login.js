import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
      this.setState({ password: event.target.value });
  }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            email: this.state.email,
            password: this.state.password
        }

        const loginhere = async () => {
            try {
                    const res = await axios.post('http://localhost:4000/api/user/login', newUser);
                    if(res.status === 200)
                    {
                        //entering the id in database
                        const id = {
                            identity: res.data._id
                        }
                        try {
                            await axios.post('http://localhost:4000/ids',id)
                            alert("Logged In as " + res.data.name)
                            window.location.href=`http://localhost:3000/${res.data.role}`
                        }
                        catch (err) {
                            // alert(err)
                        }
                    }
                    if(res.status === 204)
                    {
                        alert("Invalid Email!");
                    }
                    if(res.status === 205)
                    {
                        alert("Email not found!");
                    }
                    if(res.status === 206)
                    {
                        alert("Incorrect Password");
                    }
                } 
            catch (err) {
                //  alert(err);
                }    
        };

        loginhere();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
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
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                    <h5>Not registered yet!</h5>
                    <a href="http://localhost:3000/register">Register Here</a>
                </form>
            </div>
        )
    }
}
export default Login;