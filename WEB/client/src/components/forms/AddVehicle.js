import React, { Component} from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64';
import swat from "sweetalert2";
import {Form, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import { render } from "react-dom";
import { storage } from "../firebase";
import '../css/workout.css';

const initialState = {
    id :'',
    vehicleTypeId :'',
    vehicleName :'',
    vehiclePrice :'',
    vehiclePic : null,
    active :'true',
    enable :'false',
    image:'',
    progress:0,
    vehicle:{},
    touched: {
        vehicleName: false,
        vehiclePrice: false

    },
}

const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Vehicle Created Successfully!',
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

class addVehicle extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;


    }

    handleChange = e => {
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0]
            })
        }
    };

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate =(vehicleName,vehiclePrice)=> {
        const errors = {
            vehicleName: '',
            vehiclePrice: '',
        };
        if (this.state.touched.vehicleName && vehicleName.length < 3)
            errors.vehicleName = 'Name should be >= 3 characters';

        if (this.state.touched.vehiclePrice && vehiclePrice.length < 1)
            errors.vehiclePrice = 'Company should be >= 3 characters';


        return errors;
    }

    async onSubmit(e) {
        e.preventDefault();

        const uploadTask = storage.ref(`vehicleImages/${this.state.image.name}`).put(this.state.image);
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
                    .ref("vehicleImages")
                    .child(this.state.image.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);
                        this.setState({
                            item:{
                                vehicleTypeId: this.props.match.params.id,
                                vehicleName: this.state.vehicleName,
                                vehiclePrice: this.state.vehiclePrice,
                                vehiclePic: url,
                                active:this.state.active,
                                enable:this.state.enable
                            }
                        });
                    }).then(()=>{this.submit2();});
            }
        )

    }

    submit2(){
        if ( this.state.vehicleName.length < 3 || this.state.vehiclePrice.length < 1) {
            this.validate( this.state.vehicleName, this.state.vehiclePrice)
            let message = "Vehicle Creation Failed"
            SubmissionFail2(message);
        } else {

            axios.post('http://localhost:8080/api/vehicle',this.state.item)
                .then(response => {
                    console.log('DATA TO SEND', this.state.item);
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
        const errors=this.validate(this.state.vehicleName,this.state.vehiclePrice);

        return (
            <div className="workout_wrapper" style={{ borderTop: "10px solid black"}}>
                <br/><br/>
                <Form onSubmit={this.onSubmit}>
                    <h1 className="workout_title">ADD Vehicle</h1>
                    &nbsp;
                    <div className="row justify-content-md-center">
                        <FormGroup >
                            <Label for="workout_name">Vehicle Name</Label>
                            <div>
                                <Input
                                    type="text"
                                    name="vehicleName"
                                    id="vehicleName"
                                    size="100"
                                    value={this.state.vehicleName}
                                    onChange={this.onChange}
                                    valid={errors.vehicleName === ''}
                                    invalid={errors.vehicleName !== ''}
                                    onBlur={this.handleBlur('vehicleName')}
                                />
                                <FormFeedback>{errors.vehicleName}</FormFeedback>
                            </div>
                        </FormGroup>
                    </div>
                    <div className="row justify-content-md-center">
                        <FormGroup >
                            <Label for="workout_theme">Item vehiclePrice</Label>
                            <div>
                                <Input
                                    type="text"
                                    name="vehiclePrice"
                                    id="vehiclePrice"
                                    size="100"
                                    value={this.state.vehiclePrice}
                                    onChange={this.onChange}
                                    valid={errors.vehiclePrice === ''}
                                    invalid={errors.vehiclePrice !== ''}
                                    onBlur={this.handleBlur('vehiclePrice')}
                                />
                                <FormFeedback>{errors.vehiclePrice}</FormFeedback>
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

export default addVehicle;
