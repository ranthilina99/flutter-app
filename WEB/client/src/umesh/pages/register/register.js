import React, {Component} from 'react';
import swat from "sweetalert2";
import axios from "axios";
import {Form, FormGroup, Label, Input } from 'reactstrap';
import {SERVER_ADDRESS} from "../../../Constants/Constants";
import './register.css'
import {isEmail, isEmpty, isLength, isMobile} from "../../../Utils/validations";

const RegisteredAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Register Successfully ',
        showConfirmButton: false,
        timer: 3000
    });
}
const RegisterFail = (res) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: res
    })
}
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname:'',
            lastname:'',
            email:'',
            mobileNo:'',
            address: '',
            password:'',
            image:'',
            isLoading:false
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        let user = {
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            email: this.state.email,
            mobileNo: this.state.mobileNo,
            address: this.state.address,
            password: this.state.password,
            imageUrl: this.state.image,
        }
        if(isEmpty(this.state.firstname) && isEmpty(this.state.lastname) && isEmpty(this.state.email)&& isEmpty(this.state.mobileNo)&& isEmpty(this.state.address)&& isEmpty(this.state.password)){
            let message = "Fields are empty"
            RegisterFail(message);
        }else if(!isEmail(this.state.email)){
            let message = "Enter valid Email"
            RegisterFail(message);
        }else if(!isMobile(this.state.mobileNo)) {
            let message = "Enter valid mobile no"
            RegisterFail(message);
        }else if(isLength(this.state.password)){
            let message = "Enter at least 3 characters"
            RegisterFail(message);
        }else {
            console.log('DATA TO SEND', user);
            axios.post(SERVER_ADDRESS + '/users/register', user)
                .then(response => {
                    RegisteredAlert();
                })
                .catch(error => {
                    console.log(error.message);
                    let message = "Register Failed"
                    RegisterFail(message);
                }).finally(x => {
                this.setState({
                    firstname: '',
                    lastname: '',
                    email: '',
                    mobileNo: '',
                    address: '',
                    password: '',
                })
            });
        }
    }
    render() {
        return (
            <div>
                <br/><br/>
                <Form className="register_wrapper" onSubmit={this.onSubmit}>
                    &nbsp;
                    <h3 className="register_title">REGISTER</h3>
                    &nbsp;
                   <div className="row">
                       <FormGroup className="col-6">
                           <Label for="exampleEmail">First Name</Label>
                           <div className="register_input-container">
                               <Input
                                   type="text"
                                   name="firstname"
                                   id="exampleFirstname"
                                   placeholder="First Name"
                                   value={this.state.firstname}
                                   onChange={this.onChange}/>
                           </div>
                       </FormGroup>
                       <FormGroup className="col-6">
                           <Label for="exampleEmail">Last Name</Label>
                           <div className="register_input-container">
                               <Input
                                   type="text"
                                   name="lastname"
                                   id="exampleLastname"
                                   placeholder="Last Name"
                                   value={this.state.lastname}
                                   onChange={this.onChange}/>`
                           </div>
                       </FormGroup>
                   </div>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <div className="register_input-container">
                            <Input
                                type="email"
                                name="email"
                                id="exampleEmail"
                                placeholder="abc@gmail.com"
                                value={this.state.email}
                                onChange={this.onChange}/>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Mobile No</Label>
                        <div className="register_input-container">
                            <Input
                                type="number"
                                name="mobileNo"
                                id="exampleMobile"
                                placeholder="07xxxxxxxx"
                                value={this.state.mobileNo}
                                onChange={this.onChange}/>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Address</Label>
                        <div className="register_input-container">
                            <Input
                                type="textarea"
                                name="address"
                                placeholder="Address"
                                id="exampleText"
                                value={this.state.address}
                                onChange={this.onChange}/>
                        </div>
                    </FormGroup>
                    <FormGroup className="password-strength-meter">
                        <Label for="examplePassword">Password</Label>
                        <div className="register_input-container">
                            <Input
                                type="password"
                                name="password" id="examplePassword"
                                placeholder="password "
                                value={this.state.password}
                                onChange={this.onChange}/>
                        </div>
                    </FormGroup>
                    &nbsp;
                    <button className="register_button btn btn-primary">REGISTER</button>
                    <FormGroup>
                        <Label>Already have an account?  <a className="register"  href="/login">Login</a></Label>
                    </FormGroup>
                </Form>

            </div>
        );
    }
}

export default Register;