import React, {Component} from 'react';
import axios from 'axios';
import {Card, Col, Row} from "react-bootstrap";
import swat from "sweetalert2";
import AdminInactiveVehicleItemsView from "./ViewInactiveVehicles";


const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Vehicle Deleted Successfully!',
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

class AdminActiveVehicleItemsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Vehicle: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/api/vehicles/${this.props.match.params.id}`)
            .then(response => {
                this.setState({Vehicle: response.data});
            })
    }

    deleteItem(id) {
        axios.delete(`http://localhost:8080/api/vehicle/${id}`)
            .then(response => {
                SubmissionAlert();
                window.location.replace("/getVehicle");

            })
        SubmissionAlert();
    }

    navigateEditPage(e, itemId) {
        window.location = `/edit_vehicle/${itemId}`
    }

    render() {
        return (
            <div>
                <div className=" container" style={{width: '80%'}}>
                    <div className="card" style={{width: '100%',position:"relative"}}>
                        <div className="container">
                            <h1 style={{textTransform:"uppercase",textAlign:"center"}} >View Vehicle</h1>
                            <Row xs={1} md={2} className="g-4">
                                {this.state.Vehicle.length > 0 && this.state.Vehicle.map((item, index) => (
                                    <Col>
                                        <Card className="category-card">
                                            <Card.Img variant="top" img src={item.vehiclePic} alt="Category"  className="center w3-card-4"/>
                                            <Card.Body>
                                                <Card.Title>
                                                    <h2 className="item_title">{item.vehicleName}</h2>&nbsp;<h4 className="price_item">Rs:&nbsp;{item.itemPrice}</h4>
                                                </Card.Title>
                                                <Card.Text>
                                                    <h4 style={{color:"darkblue"}}>Speciality: {item.vehiclePrice}</h4>
                                                </Card.Text>
                                                <Card.Text>
                                                    <h4 style={{color:"darkblue"}}>Speciality: {item.active}</h4>
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <button className="btn btn-warning "
                                                        onClick={e => this.navigateEditPage(e, item.id)}>Edit
                                                </button>
                                                &nbsp; &nbsp;
                                                <button className="btn btn-danger" onClick={e => this.deleteItem(item.id)}>Delete
                                                </button>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminActiveVehicleItemsView;
