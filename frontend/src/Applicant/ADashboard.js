import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import React, {Component} from 'react';
import './Applicant.css';
import {Link} from 'react-router-dom';
import ANav from './ANav';


class ADashboard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {jobs: [],sortedJobs: [], salaryTitle:true, durationTitle:true, ratingTitle:true};
        this.renderIconSalary = this.renderIconSalary.bind(this);
        this.renderIconDuration = this.renderIconDuration.bind(this);
        this.renderIconRating = this.renderIconRating.bind(this);
        this.sortSalary = this.sortSalary.bind(this);
        this.sortDuration = this.sortDuration.bind(this);
        this.sortRating = this.sortRating.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/jobs')
             .then(response => {
                 this.setState({jobs: response.data, sortedJobs:response.data});
             })
             .catch(function(error) {
                //  console.log(error);
             })
    }
    
    // Note that this is sorting only at front-end
    sortSalary(){
        var array = this.state.jobs;
        var flag = this.state.salaryTitle;
        array.sort(function(a, b) {
            if(a.salary !== undefined && b.salary !== undefined){
                return (1 - flag*2) * (new Number(a.salary) - new Number(b.salary));
            }
            else{
                return 1;
            }
          });
        this.setState({
            jobs:array,
            salaryTitle:!this.state.salaryTitle,
        })
    }

    sortDuration(){
      var array = this.state.jobs;
      var flag = this.state.durationTitle;
      array.sort(function(a, b) {
          if(a.duration !== undefined && b.duration !== undefined){
              return (1 - flag*2) * (new Number(a.duration) - new Number(b.duration));
          }
          else{
              return 1;
          }
        });
      this.setState({
          jobs:array,
          durationTitle:!this.state.durationTitle,
      })
    }

    sortRating(){
      var array = this.state.jobs;
      var flag = this.state.ratingTitle;
      array.sort(function(a, b) {
          if(a.rating !== undefined && b.rating !== undefined){
              return (1 - flag*2) * (new Number(a.rating) - new Number(b.rating));
          }
          else{
              return 1;
          }
        });
      this.setState({
          jobs:array,
          ratingTitle:!this.state.ratingTitle,
      })
  }

    renderIconSalary(){
        if(this.state.salaryTitle){
            return(
                <ArrowDownwardIcon/>
            )
        }
        else{
            return(
                <ArrowUpwardIcon/>
            )            
        }
    }

    renderIconDuration(){
      if(this.state.durationTitle){
          return(
              <ArrowDownwardIcon/>
          )
      }
      else{
          return(
              <ArrowUpwardIcon/>
          )            
      }
  }

  renderIconRating(){
    if(this.state.ratingTitle){
        return(
            <ArrowDownwardIcon/>
        )
    }
    else{
        return(
            <ArrowUpwardIcon/>
        )            
    }
}

    render() {
        return (
            <div>
                <ANav/>
                <h2>Here are the list of jobs posted by different recruiters</h2>
                <h3>Apply for the job before the deadline reaches ;-)</h3>
                <Grid container>
                    <Grid item xs={12} >
                        <Paper>
                        <Table size="large">
                                <TableHead>
                                    <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell> Title </TableCell>   
                                            <TableCell> Recruiter Name</TableCell> 
                                            <TableCell> EmailID</TableCell>
                                            <TableCell> Applications </TableCell>
                                            <TableCell> Positions </TableCell> 
                                            <TableCell> Skills Needed </TableCell> 
                                            <TableCell> Job Type </TableCell>                     
                                            <TableCell> Salary<Button onClick={this.sortSalary}>{this.renderIconSalary()}</Button></TableCell>
                                            <TableCell> Duration<Button onClick={this.sortDuration}>{this.renderIconDuration()}</Button></TableCell>
                                            <TableCell> Rating<Button onClick={this.sortRating}>{this.renderIconRating()}</Button></TableCell>
                                            <TableCell> Date of Posting </TableCell>
                                            <TableCell> Deadline </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                this.state.jobs.map((val,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{ind+1}</TableCell>
                                            <TableCell> <Link to={`/apply_job/${val._id}`}> {val.title} </Link></TableCell>
                                            <TableCell>{val.name}</TableCell>
                                            <TableCell>{val.email}</TableCell>
                                            <TableCell>{val.applications}</TableCell>
                                            <TableCell>{val.positions}</TableCell>
                                            <TableCell>{val.skills}</TableCell>
                                            <TableCell>{val.jobtype}</TableCell>
                                            <TableCell>{val.salary}</TableCell>
                                            <TableCell>{val.duration}</TableCell>
                                            <TableCell>{val.rating}</TableCell>
                                            <TableCell>{val.postingdate}</TableCell>
                                            <TableCell>{val.deadline}</TableCell>
                                        </TableRow>
                                ))
                                }
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>    
                </Grid>            
            </div>
        )
    }
}

export default ADashboard;