import React, {Component} from 'react';
import axios from "axios";
import swat from "sweetalert2";
import {SERVER_ADDRESS} from "../../../Constants/Constants";
import {DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown} from 'reactstrap';
import jsPDF from "jspdf";
import 'jspdf-autotable'
import './admin.css'
import { ExportToCsv } from 'export-to-csv';
import 'bootstrap/dist/css/bootstrap.min.css';

const usersAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: ' Delete Successfully',
        showConfirmButton: false,
        timer: 3000
    });
}
const usersFail = () => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: ' Delete Failed!'
    })
}
class GetAllUsers extends Component {
    constructor(props) {
        super(props);
        this.state={
            users:[],
            token:'',
            search:'',
            filter:'',
            filteredData:''
        }
        this.handleChange=this.handleChange.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (!token) {
            this.setState({
                user: null
            });
            return;
        }
        this.setState({
            token:token
        })

        axios({
            method: 'get',
            url: SERVER_ADDRESS+'/users/all',
            headers: {
                Authorization: token
            },
            data: {}

        }).then(res => {
            this.setState({
                users: res.data,
                isLoggedIn: true
            })
        }).catch(err => {
            console.log(err.message);
        })
    }
    handleChange = event => {
        this.setState({ filter: event.target.value });
    };
    onDelete(id){
        if(window.confirm("Are you sure you want to delete this account?")) {
            axios.delete(SERVER_ADDRESS + `/users/delete/${id}`, {
                headers: {
                    Authorization: this.state.token
                }
            }).then(res => {
                usersAlert()
                window.location.replace('/getAll')
            }).catch(err => {
                usersFail()
                console.log(err.message);
            })
        }
    }
    ExportCSV = () => {
        const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            filename :'intern all users report',
            title: 'All User Details CSV ',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: false,
            headers: [ 'First Name','Last Name','Email', 'Contact No', 'DOB', 'Address', 'Gender', 'Position'],
        };
        const data = this.state.users.map(elt=> [elt.firstName, elt.lastName,elt.email, elt.mobileNo,elt.DOB, elt.address, elt.Gender, elt.position]);

        const csvExporter = new ExportToCsv(options);

        csvExporter.generateCsv(data);
    }
    ExportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(25);


        const title = "Internship All User Details ";
        const headers = [["First Name", "Last Name","Email", "Contact No","DOB", "Address","Gender", "Position"]];

        const data = this.state.users.map(elt=> [elt.firstName, elt.lastName,elt.email, elt.mobileNo,elt.DOB, elt.address, elt.Gender, elt.position]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.setFont('helvetica')
        doc.setTextColor(0, 0, 255)
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("equinox all users report.pdf")
    }
    onchange =(e)=>{
        this.setState({
            search:e.target.value
        });
    }
    render() {
        const { filter, users } = this.state;
        const lowerCasedFilter = filter.toLowerCase();
        const upperCasedFilter = filter.toUpperCase();
        this.state.filteredData = users.filter(users => {
            return Object.keys(users).some(key =>
                typeof users[key] === "string" && users[key].toLowerCase().includes(lowerCasedFilter) && users[key].toUpperCase().includes(upperCasedFilter)
            );
        });
        return (
            <div className="container">
                <br/>
                <div className="navbar  justify-content-between alert alert-primary"  role="alert">
                    <h3 className="admin_title">All User Details</h3>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2 mr-md-2 " type="search" placeholder="Search" aria-label="Search" value={filter} onChange={this.handleChange}/>
                    </form>
                </div>
                <table className="table table-striped table-hover table-dark  table-bordered  col-md-12 ">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        {/*<th scope="col">ID</th>*/}
                        <th scope="col">Position</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact No </th>
                        <th scope="col">DOB </th>
                        <th scope="col">Address </th>
                        <th scope="col">Gender </th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.length > 0 && this.state.filteredData.map((users, index)=>(
                        <tr key={index}>
                            <th scope="row" >{index + 1}</th>
                            {/*<td>{users._id}</td>*/}
                            <td>{users.position}</td>
                            <td>{users.firstName}</td>
                            <td>{users.lastName}</td>
                            <td>{users.email}</td>
                            <td>{users.mobileNo}</td>
                            <td>{users.DOB}</td>
                            <td>{users.address}</td>
                            <td>{users.Gender}</td>
                            <td>
                                &nbsp;
                                <a className = "btn btn-danger" href="#" onClick={()=>this.onDelete(users._id)}>
                                    <i className="fa fa-trash"></i>&nbsp;
                                </a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div align="right">
                    <UncontrolledDropdown >
                        <DropdownToggle  style={{color: 'white', backgroundColor:"blue",marginRight:'15px'}} className = "btn btn-lg">
                            <i class="fa fa-download"></i>&nbsp;Generate Report&nbsp;
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem onClick={this.ExportPDF}>
                                PDF File
                            </DropdownItem>
                            <DropdownItem divider/>
                            <DropdownItem onClick={this.ExportCSV}>
                                CSV File
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
                <br/>
                <br/>
            </div>
        );
    }
}

export default GetAllUsers;
