import React, {Component} from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64';
import swat from "sweetalert2";
import {FormGroup} from "@material-ui/core";
import {Form, FormFeedback, Input, Label} from "reactstrap";


const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Item Updated Successfully!',
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
    typeName :'',
    typePic :'',
    image:'',
    progress:0,
    item:{},
    touched: {
        typeName: false,
        typePic: false

    }
}

class EditVehicleTypeItems extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/api/vehicleType/${this.props.match.params.id}`)
            .then(response => {
                this.setState(
                    {
                        typeName: response.data.typeName,
                        typePic: response.data.typePic,
                    });
            })
            .catch(error => {
                alert(error.message)
            })
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        });
    }

    validate = (typeName) => {
        const errors = {
            typeName: ''
        };
        if (this.state.touched.typeName && typeName.length <= 0)
            errors.typeName = 'Category Item should be filled';

        return errors;
    }


    onSubmit(e) {

        e.preventDefault();
        let item = {
            typeName: this.state.typeName,
        };
        this.setState({
            categoryID: this.props.match.params.id
        });
        if (this.state.typeName.length < 0 || this.state.typeName.length < 0 ) {
        } else {
            console.log('DATA TO SEND', item);
            axios.put(`http://localhost:8080/api/vehicleType/${this.props.match.params.id}`,item)
                .then(response => {
                    SubmissionAlert();
                    window.location.replace("/view_VehicleType");
                })
                .catch(error => {
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
                    <h1 className="workout_title">Edit Vehicle Type</h1>
                    &nbsp;
                    <div className="row justify-content-md-center">
                        <FormGroup >
                            <Label for="workout_name">Category Type Name</Label>
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
                    <button className="workout_button btn btn-primary">SUBMIT</button>
                </Form>

            </div>
        )
    }
}

export default EditVehicleTypeItems;
