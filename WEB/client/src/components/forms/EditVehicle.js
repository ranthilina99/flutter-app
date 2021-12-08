import React, {Component} from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64';
// import './stock.css'
import swat from "sweetalert2";
import {FormGroup} from "@material-ui/core";
import {Form, FormFeedback, Input, Label} from "reactstrap";
import {storage} from "../firebase";
import {Card} from "react-bootstrap";


const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Category Updated Successfully!',
        showConfirmButton: false,
        timer: 3000
    });
}
const SubmissionFail = (message) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
    })
}
const initialState = {
    id: '',
    vehicleName: '',
    vehiclePrice: '',
    active:'',
    vehiclePic:null,
    image:'',
    progress:0,
    supplier:{},
    touched: {
        vehicleName: false,
        vehiclePrice: false,
    }
}

class EditVehicleAdmin extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    componentDidMount() {

        axios.get(`http://localhost:8080/api/vehicle/${this.props.match.params.id}`)
            .then(response => {
                this.setState(
                    {

                        vehicleName: response.data.vehicleName,
                        vehiclePrice: response.data.vehiclePrice,
                        active: response.data.active,

                    });
            })
            .catch(error => {
                alert(error.message)
            })

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

        if (this.state.touched.vehiclePrice && vehiclePrice.length < 3)
            errors.vehiclePrice = 'Price should be >= 3 characters';

        return errors;
    }


    onSubmit(e) {
        e.preventDefault();
        let  vehicle={
            vehicleName: this.state.vehicleName,
            vehiclePrice: this.state.vehiclePrice,
            active: this.state.active,
        };


        if (this.state.vehicleName.length < 3 || this.state.vehiclePrice.length < 3 ) {
            this.validate(this.state.vehicleName, this.state.vehiclePrice)
        }
        else
        {
            axios.put(`http://localhost:8080/api/vehicle/${this.props.match.params.id}`,vehicle)
                .then(response => {
                    SubmissionAlert();
                    window.location.replace("/getAllVehicle");
                })
                .catch(error => {
                    console.log(error.message);
                    alert(error.message)
                })
        }
    }

    render() {
        const errors=this.validate(this.state.supplierName,this.state.supplierCompany,this.state.supplierSpeciality,this.state.supplierEmail);

        return (
            <div className="workout_wrapper" style={{ borderTop: "10px solid black"}}>
                <br/><br/>
                <Form onSubmit={this.onSubmit}>
                    <h1 className="workout_title">UPDATE VEHICLE</h1>
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
                            <Label for="workout_theme">Vehicle Price</Label>
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
                    <div className="row justify-content-md-center">
                    <FormGroup className="col-4">
                        <Label for="exampleSelect">Gender</Label>
                        <div>
                            <Input
                                type="select"
                                name="Gender"
                                id="exampleSelect"
                                value={this.state.active}
                                onChange={this.onChange}
                                valid={errors.active === ''}
                                invalid={errors.active !== ''}
                                onBlur={this.handleBlur('active')}>
                                <option value="" disabled>Select Active Status</option>
                                <option value={'true'}>True</option>
                                <option value={'false'}>False</option>
                            </Input>
                            <FormFeedback>{errors.active}</FormFeedback>
                        </div>
                    </FormGroup>
                    </div>
                    <button className="workout_button btn btn-primary">SUBMIT</button>
                </Form>

            </div>
        )
    }
}

export default EditVehicleAdmin;
