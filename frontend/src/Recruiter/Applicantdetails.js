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
import './Recruiter.css';
import RNav from './RNav';

var JOBID;
class ADashboard extends Component {
    
    constructor(props) {
        super(props);
        JOBID=props.match.params.id;

        this.state = {applicants: [], sortedapplicants: [], ratingTitle: true, nameTitle: true};
    
        this.renderIconName = this.renderIconName.bind(this);
        this.renderIconRating = this.renderIconRating.bind(this);

        this.sortName = this.sortName.bind(this);
        this.sortRating = this.sortRating.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/users/alljobs/${JOBID}`)
             .then(response => {
                 this.setState({applicants: response.data, sortedapplicants:response.data});
             })
             .catch(function(error) {
                //  console.log(error);
             })
    }
    
    sortName(){
      var array = this.state.applicants;
      var flag = this.state.nameTitle;
      array.sort(function(a, b) {
          if(a.name !== undefined && b.name !== undefined){
              var s1=a.name,s2=b.name
              return (1 - flag*2) * (s1.localeCompare(s2));
          }
          else{
              return 1;
          }
        });
      this.setState({
          applicants:array,
          nameTitle:!this.state.nameTitle,
      })
    }

    sortRating(){
      var array = this.state.applicants;
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
          applicants:array,
          ratingTitle:!this.state.ratingTitle,
      })
  }

    renderIconName(){
      if(this.state.nameTitle){
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
                <RNav/>
                <h1>List of applicants who have applied under you for this job</h1>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell> Sr No.</TableCell>
                                            <TableCell> Name <Button onClick={this.sortName}>{this.renderIconName()}</Button></TableCell>   
                                            <TableCell> Skills</TableCell>
                                            <TableCell> Education</TableCell>
                                            <TableCell> Rating<Button onClick={this.sortRating}>{this.renderIconRating()}</Button></TableCell>
                                            <TableCell> SOP</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                this.state.applicants.map((val,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{ind+1}</TableCell>
                                            <TableCell> {val.name}</TableCell>
                                            <TableCell>{val.skills}</TableCell>
                                            <TableCell>{val.education}</TableCell>
                                            <TableCell>{val.rating}</TableCell>
                                            <TableCell>{val.sop}</TableCell>
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