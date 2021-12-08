import React, { Component} from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64';
import swat from "sweetalert2";
import {Form, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import { render } from "react-dom";
//////
import { storage } from "../firebase";
//////
import '../css/workout.css';





const initialState = {
    id: '',
    typeName: '',
    typePic:null,
    image:'',
    progress:0,
    VehicleType:{},
    touched: {
        typeName: false,
        typePic:false,
    }
}

const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'VehicleType Created Successfully!',
        showConfirmButton: false,
        timer: 3000
    });
}

const SubmissionFail = () => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Submission Error!'
    })
}

const SubmissionFail2 = (message) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
    })
}

class addVehicleType extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;


    }


    //////////////////
    handleChange = e => {
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0]
            })
        }
    };
    //////////////////////

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate =(typeName)=> {
        const errors = {
            typeName: '',
        };
        if (this.state.touched.typeName && typeName.length < 3)
            errors.typeName = 'Name should be >= 3 characters';

        return errors;
    }

    async onSubmit(e) {
        e.preventDefault();

        const uploadTask = storage.ref(`typeImages/${this.state.image.name}`).put(this.state.image);
        await uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                this.setState({
                    progress: progress
                });

            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("typeImages")
                    .child(this.state.image.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);
                        this.setState({
                            supplier:{
                                typeName: this.state.typeName,
                                typePic: url,
                            }
                        });
                    }).then(()=>{this.submit2();});
            }
        )
    }

    submit2(){
        if (this.state.typeName.length < 3  ) {
            this.validate(this.state.typeName)
            let message = "TypeName Creation Failed"
            SubmissionFail2(message);
        } else {

            console.log("asdasd    "+this.state.VehicleType.typePic);

            axios.post('http://localhost:8080/api/vehicleType',this.state.VehicleType)
                .then(response => {
                    console.log('DATA TO SEND', this.state.VehicleType);
                    SubmissionAlert();
                    window.location.replace("/view_VehicleType");
                })
                .catch(error => {
                    console.log(error.message);
                    SubmissionFail();
                })
        }
    }

    render() {
        const errors=this.validate(this.state.typeName);

        return (
            <div className="workout_wrapper" style={{ borderTop: "10px solid black"}}>
                <br/><br/>
                <Form onSubmit={this.onSubmit}>
                    <h1 className="workout_title">ADD VEHICLE TYPE</h1>
                    &nbsp;
                    <div className="row justify-content-md-center">
                        <FormGroup >
                            <Label for="workout_name">Vehicle Type</Label>
                            <div>
                                <Input
                                    type="text"
                                    name="typeName"
                                    id="typeName"
                                    size="100"
                                    value={this.state.typeName}
                                    onChange={this.onChange}
                                    valid={errors.typeName === ''}
                                    invalid={errors.typeName !== ''}
                                    onBlur={this.handleBlur('typeName')}
                                />
                                <FormFeedback>{errors.typeName}</FormFeedback>
                            </div>
                        </FormGroup>
                    </div>

                    <div className="row justify-content-center">
                        <div>
                            {/*<FileBase type="file" multiple={false} onDone={({base64}) => this.state.supplierPic = base64} />*/}
                            <input type="file" onChange={this.handleChange} />
                        </div>
                    </div>
                    &nbsp;
                    <button className="workout_button btn btn-primary">SUBMIT</button>
                </Form>

            </div>
        )
    }
}

export default addVehicleType;
