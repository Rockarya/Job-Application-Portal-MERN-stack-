import React, {Component} from 'react';
import axios from 'axios';
import ANav from './ANav';

var SOP;
axios.get('http://localhost:4000/ids')
.then(res => {
    axios.get(`http://localhost:4000/users/${res.data[0].identity}`)
    .then(respo => {
        SOP=respo.data.sop;
    });
});

class ApplyJob extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sop: SOP
        }

        this.onChangeSOP = this.onChangeSOP.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeSOP(event) {
        this.setState({ sop: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newSOP = {
            sop: this.state.sop
        };
        
        const writesop = async () => {
            axios.get('http://localhost:4000/ids')
            .then(res => {
                axios.patch(`http://localhost:4000/users/sop/${res.data[0].identity}`,newSOP)
                .then(response => {
                    if(response.status === 200)
                    {
                        alert("SOP sent\nYou have succesfully applied for this job");
                        window.location.href='http://localhost:3000/adashboard';
                    }
                    else if(response.status === 205)
                    {
                        alert("Make sure that you do not exceed the limit of 250 letters in SOP");
                    }
                });
            }); 
        };    
        writesop();
    }

    render() {
        return (
            <div>
                <ANav/>
                <h1>Write Statement of Purpose for the job</h1>
                <h3>Max Permissible length is 250</h3>
                <h5>Try to write a short and sweet SOP :-)</h5>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <textarea type="text" 
                            placeholder="Statement of Purpose"
                                rows={10}
                                cols={50}
                               className="form-control"
                               value={this.state.sop}
                               onChange={this.onChangeSOP}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default ApplyJob;