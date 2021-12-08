import React, {Component} from 'react';
import swat from "sweetalert2";
import axios from "axios";
import {Form, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import {SERVER_ADDRESS} from "../../../Constants/Constants";
import zxcvbn from "zxcvbn";
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin.css';
import {isMobile} from "../../../Utils/validations";

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

class AdminRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname:'',
            lastname:'',
            email:'',
            mobileNo:'',
            address: '',
            DOB:'',
            Gender:'',
            Eposition:'',
            password:'',
            touched: {
                firstname: false,
                address:false,
                mobileNo:false,
                email:false,
                lastname:false,
                password:false,
                DOB:false,
                Gender:false,
                Eposition:false
            }
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }
    validate =(firstname,address,mobileNo,email,lastname,password,DOB,Gender,Eposition)=> {
        const errors = {
            firstname: '',
            address:'',
            mobileNo:'',
            email:'',
            lastname:'',
            password:'',
            DOB:'',
            Gender:'',
            Eposition:''

        };
        if (this.state.touched.firstname && firstname.length < 3)
            errors.firstname = 'First Name should be >= 3 characters';

        if (this.state.touched.lastname && lastname.length < 3)
            errors.lastname = 'First Name should be >= 3 characters';

        if (this.state.touched.address && address.length < 3)
            errors.address = 'First Name should be >= 3 characters';

        if (this.state.touched.mobileNo && mobileNo.length<10 || mobileNo.length >=11)
            errors.mobileNo = 'Tel. Number should contain only 10 digit number';

        const reg = /^\d+$/;
        if (this.state.touched.mobileNo && !reg.test(mobileNo))
            errors.mobileNo = 'Tel. Number should contain only numbers'

        const reg3=/^(?:7|0|(?:\+94))[0-9]{9,10}$/
        if (this.state.touched.mobileNo && !reg3.test(mobileNo))
            errors.mobileNo = 'Tel. please the match request format '

        const reg1 = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(this.state.touched.email && !reg1.test(email))
            errors.email = 'Email should contain a abc@gmail.com';

        const reg2 =new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        if(this.state.touched.password && (password.length < 8) && !reg2.test(password))
            errors.password = 'Password the at least 8 characters ';

        if(this.state.touched.DOB && (DOB===''))
            errors.DOB = 'Field is Empty';

        if(this.state.touched.Gender && (Gender===''))
            errors.Gender = 'Field is Empty';

        if(this.state.touched.Eposition && (Eposition===''))
            errors.Eposition = 'Field is Empty';

        return errors;
    }
    onSubmit(e) {
        e.preventDefault();
        let user = {
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            email: this.state.email,
            mobileNo: this.state.mobileNo,
            DOB: this.state.DOB,
            address: this.state.address,
            Gender: this.state.Gender,
            position: this.state.Eposition,
            user_password: this.state.password,
        }
        console.log('DATA TO SEND', user);
        if (this.state.firstname.length < 3 || this.state.address.length < 3 ||
            this.state.mobileNo.length < 10 || this.state.mobileNo.length >= 11 || this.state.email.split('').filter(x => x === '@').length !== 1 ||
            this.state.lastname.length < 3 || this.state.password.length < 8 ){
            this.validate(this.state.firstname,this.state.address,this.state.mobileNo,this.state.email,
                this.state.lastname,this.state.password,this.state.DOB,this.state.Gender,this.state.Eposition)
            let message = "Register Failed"
            RegisterFail(message);
        } else if(!isMobile(this.state.mobileNo) || !isLengthMobile(this.state.mobileNo)){
            let message = "Please enter the valid phone No"
            RegisterFail(message);
        }else {
            axios.post(SERVER_ADDRESS + '/users/admin_register', user)
                .then(response => {
                    this.setState({
                        firstname: '',
                        lastname: '',
                        email: '',
                        mobileNo: '',
                        DOB: '',
                        address: '',
                        Gender: '',
                        position: '',
                        password: '',
                    });
                    RegisteredAlert();
                })
                .catch(error => {
                    console.log(error.message);
                    let message = "Register Failed"
                    RegisterFail(message);
                });
        }
    }
    createPasswordLabel = (result) => {
        switch (result.score) {
            case 0:
                return 'Weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Fair';
            case 3:
                return 'Good';
            case 4:
                return 'Strong';
            default:
                return 'Weak';
        }
    }
    render() {
        const errors=this.validate(this.state.firstname,this.state.address,this.state.mobileNo,this.state.email
            ,this.state.lastname,this.state.password,this.state.DOB,this.state.Gender,this.state.Eposition);
        const testedResult = zxcvbn(this.state.password);
        return (
            <div>
                <br/><br/>
                <Form className="admin_wrapper" onSubmit={this.onSubmit}>
                    <h1 className="admin_title">User Register</h1>
                    <div className="row">
                        <FormGroup className="col-6">
                            <Label for="exampleEmail">First Name</Label>
                            <div>
                                <Input
                                    type="text"
                                    name="firstname"
                                    id="exampleFirstname"
                                    placeholder="First Name"
                                    value={this.state.firstname}
                                    onChange={this.onChange}
                                    valid={errors.firstname === ''}
                                    invalid={errors.firstname !== ''}
                                    onBlur={this.handleBlur('firstname')}
                                />
                                <FormFeedback>{errors.firstname}</FormFeedback>
                            </div>
                        </FormGroup>
                        <FormGroup className="col-6">
                            <Label for="exampleEmail">Last Name</Label>
                            <div>
                                <Input
                                    type="text"
                                    name="lastname"
                                    id="exampleLastname"
                                    placeholder="Last Name"
                                    value={this.state.lastname}
                                    onChange={this.onChange}
                                    valid={errors.lastname === ''}
                                    invalid={errors.lastname !== ''}
                                    onBlur={this.handleBlur('lastname')}
                                />
                                <FormFeedback>{errors.lastname}</FormFeedback>
                            </div>
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <div>
                            <Input
                                type="email"
                                name="email"
                                id="exampleEmail"
                                placeholder="abc@gmail.com"
                                value={this.state.email}
                                onChange={this.onChange}
                                valid={errors.email === ''}
                                invalid={errors.email !== ''}
                                onBlur={this.handleBlur('email')}/>
                            <FormFeedback>{errors.email}</FormFeedback>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Mobile No</Label>
                        <div>
                            <Input
                                type="number"
                                name="mobileNo"
                                id="exampleMobile"
                                placeholder="Mobile Number"
                                value={this.state.mobileNo}
                                onChange={this.onChange}
                                valid={errors.mobileNo === ''}
                                invalid={errors.mobileNo !== ''}
                                onBlur={this.handleBlur('mobileNo')}/>
                            <FormFeedback>{errors.mobileNo}</FormFeedback>
                        </div>
                    </FormGroup>
                    <div className="row">
                        <FormGroup className="col-4">
                            <Label for="exampleEmail">Date Of Birth</Label>
                            <div>
                                <Input
                                    type="date"
                                    name="DOB"
                                    id="exampleDate"
                                    placeholder="Date Of Birth<"
                                    value={this.state.DOB}
                                    onChange={this.onChange}
                                    valid={errors.DOB === ''}
                                    invalid={errors.DOB !== ''}
                                    onBlur={this.handleBlur('DOB')}/>
                                <FormFeedback>{errors.DOB}</FormFeedback>
                            </div>
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Label for="exampleSelect">Gender</Label>
                            <div>
                                <Input
                                    type="select"
                                    name="Gender"
                                    id="exampleSelect"
                                    value={this.state.Gender}
                                    onChange={this.onChange}
                                    valid={errors.Gender === ''}
                                    invalid={errors.Gender !== ''}
                                    onBlur={this.handleBlur('Gender')}>
                                    <option value="" disabled>Select Gender</option>
                                    <option value={'male'}>Male</option>
                                    <option value={'female'}>Female</option>
                                </Input>
                                <FormFeedback>{errors.Gender}</FormFeedback>
                            </div>
                        </FormGroup>
                        <FormGroup className="col-4">
                            <Label for="exampleSelect">Position</Label>
                            <Input
                                type="select"
                                name="Eposition"
                                id="exampleSelect"
                                value={this.state.Eposition}
                                onChange={this.onChange}
                                valid={errors.Eposition === ''}
                                invalid={errors.Eposition !== ''}
                                onBlur={this.handleBlur('Eposition')}>
                                <option value="" disabled>Select position</option>
                                <option value={'user'}>User</option>
                                <option value={'employee'}>Employee</option>
                                <option value={'admin'}>Administrator</option>
                            </Input>
                            <FormFeedback>{errors.Eposition}</FormFeedback>
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Label for="exampleText">Address</Label>
                        <div>
                            <Input
                                type="textarea"
                                name="address"
                                id="exampleText"
                                value={this.state.address}
                                onChange={this.onChange}
                                valid={errors.address === ''}
                                invalid={errors.address !== ''}
                                onBlur={this.handleBlur('address')}/>
                        </div>
                        <FormFeedback>{errors.address}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <div>
                            <Input
                                type="password"
                                name="password" id="examplePassword"
                                placeholder="password "
                                value={this.state.password}
                                onChange={this.onChange}
                                valid={errors.password === ''}
                                invalid={errors.password !== ''}
                                onBlur={this.handleBlur('password')}/>
                        </div>
                        <FormFeedback>{errors.password}</FormFeedback>
                        {this.state.password &&
                        <progress
                            className={`password-strength-meter-progress strength-${this.createPasswordLabel(testedResult)}`}
                            value={testedResult.score}
                            max="4"
                        />
                        }
                        <FormGroup>
                            <Label
                                className="password-strength-meter-label"
                            >
                                {this.state.password &&  (
                                    <>
                                        <strong>Password strength:</strong> {this.createPasswordLabel(testedResult)}
                                    </>
                                )}
                            </Label>
                        </FormGroup>
                    </FormGroup>
                    <button className="register_button btn btn-primary">Submit</button>

                </Form>

            </div>
        );
    }
}

export default AdminRegister;
