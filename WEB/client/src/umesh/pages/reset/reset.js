import React, {Component} from 'react';
import swat from "sweetalert2";
import axios from "axios";
import {SERVER_ADDRESS} from "../../../Constants/Constants";
import {FormGroup, Input, Label} from "reactstrap";
import {Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import './reset.css'
import {isLength, isMatch} from "../../../Utils/validations";
const RegisteredAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: ' Password Update successful',
        showConfirmButton: false,
        timer: 3000
    });
}

const RegisterFail = (message) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
    })
}
class Reset extends Component {
    constructor(props) {
        super(props);
        this.state={
            password:'',
            confirm_password:'',
            token:'',
            afterReset:false,
            showMeter:true
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.clear=this.clear.bind(this);
    }
    componentDidMount() {
        let token1= this.props.match.params.id
        console.log(token1)
        this.setState({
            token:token1
        })
    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }
    clear(){
       this.setState({
           password:'',
           confirm_password:'',
           afterReset:true
       })
    }
    onSubmit(e) {
        e.preventDefault();
        let user = {
            password: this.state.password
        }
        if(isLength(this.state.password) && isLength(this.state.confirm_password)){
            let message= "Enter at least 3 characters"
            RegisterFail(message);
        }else if(!isMatch(this.state.password,this.state.confirm_password)){
            let message= "No match password"
            RegisterFail(message);
        }else {
            console.log('DATA TO SEND', user);
            axios.post(SERVER_ADDRESS + '/users/reset_password', user, {
                headers: {Authorization: this.state.token}
            })
                .then(response => {
                    RegisteredAlert();
                    this.clear();
                })
                .catch(error => {
                    console.log(error.message);
                    let message = "Password Error"
                    RegisterFail(message);
                })
        }
    }

    render() {
        return (
            <div>
                <Form className="reset_wrapper" onSubmit={this.onSubmit}>
                        &nbsp;
                    <h3 className="reset_title">RESET PASSWORD</h3>
                    <FormGroup>
                        <Label for="exampleEmail">Password</Label>
                        <div className="Login_input-container">
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                id="password"
                                placeholder="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                required/>
                        </div>
                    </FormGroup>
                    <FormGroup className="password-strength-meter">
                        <Label for="exampleEmail">Confirm Password</Label>
                        <div className="Login_input-container">
                            <Input
                                type="password"
                                className="form-control"
                                name="confirm_password"
                                id="confirm_password"
                                placeholder="Confirm Password"
                                value={this.state.confirm_password}
                                onChange={this.onChange}
                                required/>
                        </div>
                        &nbsp;

                    </FormGroup>
                    <button className="reset_button btn btn-primary">Submit</button>
                    <FormGroup>
                        <div className="w-50 register" >
                            <h6>Login Page <Link to="/login">Login</Link></h6>
                        </div>
                    </FormGroup>
                    <br/>
                    {this.state.afterReset ?
                        <FormGroup>
                            <div className="w-50 reset" >
                                <h6 style={{color:"red"}}>Password Reset Successfully.</h6>
                            </div>
                        </FormGroup>
                        :
                        null
                    }
                </Form>
            </div>
        );
    }
}

export default Reset;