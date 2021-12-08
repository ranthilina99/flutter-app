import React, {Component} from 'react';
import swat from "sweetalert2";
import axios from "axios";
import {SERVER_ADDRESS} from "../../../Constants/Constants";
import {Input, Label, Form, FormGroup,Button} from "reactstrap";
import FileBase from 'react-file-base64'
import './profile.css'
import Avatar from "react-avatar";
import {isLength, isMatch} from "../../../Utils/validations";

const SuccessAlert = (res) => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: res +" "+ 'Successfully',
        showConfirmButton: false,
        timer: 3000
    });
}

const FailAlert = (res) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: res
    })
}

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            mobile: '',
            address: '',
            position: "",
            passwordFields: '',
            updateFields: true,
            token: '',
            newPassword: '',
            confirmPassword: '',
            image: '',
            PImage: '',
            id: '',
            user1: "",
            type: '',
            isLoggedIn:false
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmitHandler=this.onSubmitHandler.bind(this);
        this.onDelete=this.onDelete.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.logoutOnClick=this.logoutOnClick.bind(this);
    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
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
            token:token,
        })
        axios({
            method: 'get',
            url: SERVER_ADDRESS +'/users/',
            headers: {
                Authorization: token
            },
            data: {}
        }).then(res => {
            this.setState({
                image: res.data.imageUrl,
                lastname: res.data.lastName,
                firstname: res.data.firstName,
                email: res.data.email,
                mobile: res.data.mobileNo,
                address: res.data.address,
                id:res.data._id,
                isLoggedIn: true
            })
        }).catch(err => {
            console.log(err.message);
        })
    }
    logoutOnClick = e => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('userPosition');
        this.setState({
            isLoggedIn: false,
            user1: ''
        })
        window.location.replace('/login')
    }
    onSubmitHandler (e) {
        e.preventDefault();
        let user = {
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            email: this.state.email,
            mobileNo: this.state.mobile,
            address: this.state.address,
            imageUrl: this.state.PImage,
        }
        console.log('DATA TO SEND', user);
        axios.put(SERVER_ADDRESS+'/users/update', user, {
            headers: {Authorization: this.state.token}
        }).then(() => {
                let message = "User Update"
                SuccessAlert(message)
                window.location.replace('/profile')

            }).catch(error => {
            let message = "Update"
            console.log(error);
            FailAlert(message)
            this.setState({
                firstname: '',
                lastname: '',
                email: '',
                mobile: '',
                address: '',
                PImage:''
            })
        });
    }

    onDelete(id){
        if(window.confirm("Are you sure you want to delete this account?")) {
            axios.delete(SERVER_ADDRESS + `/users/delete/${id}`, {
                headers: {
                    Authorization: this.state.token
                }
            }).then(() => {
                let message = "User Delete"
                SuccessAlert(message)
                window.location.replace('/')
            }).catch(err => {
                let message = "User Delete"
                FailAlert(message)
                console.log(err.message);
            })
        }
    }
    onSubmit(e) {
        e.preventDefault();
        let user = {
            new_password:this.state.newPassword
        }
        if(isLength(this.state.newPassword) && isLength(this.state.confirmPassword)){
            let message= "Enter at least 3 characters"
            FailAlert(message);
        }else if(!isMatch(this.state.newPassword,this.state.confirmPassword)){
            let message= "No match password"
            FailAlert(message);
        }else {
            console.log('DATA TO SEND', user);
            axios.post(SERVER_ADDRESS + `/users/update_password/${this.state.id}`, user, {
                headers: {Authorization: this.state.token}
            })
                .then(() => {
                    let message = "Password Change"
                    SuccessAlert(message);
                    window.location.replace("/profile");
                })
                .catch(error => {
                    console.log(error.message);
                    let message = "Password Error"
                    FailAlert(message);
                })
        }
    }
    render() {
        return (
            <>
                <Form >
                    <div className="profile_page">

                        <div className="col-left">
                            <div className="avatar1">
                                <Avatar size="150px" round={true}
                                        name={this.state.firstname+ " " +this.state.lastname}
                                        src={this.state.image}/>
                            </div>
                            {this.state.updateFields &&
                            <>
                                <h2 className="profile_title">User Profile</h2>
                                <hr/>
                                <div className="row">
                                    <FormGroup className="col-6">
                                        <Label for="exampleEmail">First Name</Label>
                                        <Input
                                            type="text"
                                            name="firstname"
                                            id="exampleFirstname"
                                            placeholder="First Name"
                                            value={this.state.firstname}
                                            onChange={this.onChange}
                                            required/>
                                    </FormGroup>
                                    <FormGroup className="col-6">
                                        <Label for="exampleLastName">Last Name</Label>
                                        <Input
                                            type="text"
                                            name="lastname"
                                            id="exampleLastname"
                                            placeholder="Last Name"
                                            value={this.state.lastname}
                                            onChange={this.onChange}
                                            required/>
                                    </FormGroup>
                                </div>
                                <FormGroup>
                                    <Label for="exampleEmail">Email</Label>
                                    <Input disabled
                                           type="email"
                                           name="email"
                                           id="exampleEmail"
                                           placeholder="abc@gmail.com"
                                           value={this.state.email}
                                           onChange={this.onChange}
                                           required/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">Mobile No</Label>
                                    <Input
                                        type="number"
                                        name="mobile"
                                        id="exampleMobile"
                                        placeholder="Mobile Number"
                                        value={this.state.mobile}
                                        onChange={this.onChange}
                                        required/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleText">Address</Label>
                                    <Input
                                        type="textarea"
                                        name="address"
                                        id="exampleText"
                                        value={this.state.address}
                                        onChange={this.onChange}
                                        required/>
                                </FormGroup>
                                <div className="mb-3">
                                    <Label htmlFor="res_img" className="form-label">Picture</Label>
                                    <div>
                                        <FileBase type="file"  multiple={false} onDone={({base64}) => this.state.PImage = base64} />
                                    </div>
                                </div>
                            </>
                            }
                            {this.state.updateFields &&
                            <Button size="lg" block color="primary" onClick={this.onSubmitHandler}>Update Profile</Button>
                            }
                            {this.state.passwordFields &&
                            <Form>
                                <h2 className="profile_title">Change Password</h2>
                                <hr/>
                                <FormGroup>
                                    <Label for="exampleText">New Password</Label>
                                    <Input type="password"
                                           name="newPassword"
                                           placeholder="New Password"
                                           value={this.state.newPassword}
                                           onChange={this.onChange}
                                           required/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleText">Confirm Password</Label>
                                    <Input type="password"
                                           name="confirmPassword"
                                           placeholder="Confirm Password"
                                           value={this.state.confirmPassword}
                                           onChange={this.onChange}
                                           required/>
                                </FormGroup>
                                <FormGroup>
                                    <Button size="lg" block color="success" type="button"
                                            onClick={this.onSubmit}>Update Password</Button>
                                </FormGroup>
                                <FormGroup>
                                    <Button size="lg" block color="warning" type="button"
                                            onClick={this.passwordFieldHide}>Cancel</Button>
                                </FormGroup>
                            </Form>
                            }
                            {!this.state.passwordFields &&
                            <Button size="lg" block color="success" type="button"
                                    onClick={this.passwordFieldShow}>Change Password</Button>
                            }
                            <>
                                {this.state.updateFields &&
                                <>
                                    <h6>Delete Profile</h6>
                                    <Button className="btn  btn-danger float-right" block href="/"
                                            onClick={() => this.onDelete(this.state.id)}>
                                        <i className="fas fa-trash">Delete</i>&nbsp;
                                    </Button>
                                </>
                                }
                            </>
                        </div>
                    </div>
                </Form>
            </>
        );
    }
    passwordFieldShow = () =>{
        this.setState({
            passwordFields: true,
            updateFields:false
        })
    }
    passwordFieldHide = () =>{
        this.setState({
            passwordFields: false,
            updateFields:true
        })
    }
}

export default Profile;