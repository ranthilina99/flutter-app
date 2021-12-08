import React, { Component} from 'react';
import axios from 'axios';
import '../css/commonViewsCSS.css';
import {Card, Col, Row} from 'react-bootstrap';

class viewVehicleCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleTypes: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/vehicleTypes')

            .then(response => {
                this.setState({vehicleTypes: response.data });
            }).then(()=>{

        })
    }

    navigateViewItemsPage(e, categoryVehicleId) {
        window.location = `/view_Vehicle/${categoryVehicleId}`
    }


    render() {
        return (
            <div>
                <div className=" container" style={{width: '80%'}}>
                    <div className="card" style={{width: '100%'}}>
                        <div className="container ">
                            <h1 style={{textTransform:"uppercase",textAlign:"center"}}>Vehicle Category</h1>
                            <Row xs={1} md={2} className="g-4">
                                {this.state.vehicleTypes.length > 0 && this.state.vehicleTypes.map((item, index) => (
                                    <Col>
                                        <Card className="category-card">
                                            <div align="right">
                                            </div>
                                            <Card.Img variant="top" img src={item.typePic} alt="Category"  className="center card-img-top item_img-zoom w3-card-4"/>

                                            <Card.Body>
                                                <Card.Title>
                                                    <h3>{item.typeName}</h3>
                                                </Card.Title>
                                            </Card.Body>
                                            <Card.Footer className="item-footer-button">
                                                <button className="btn btn-primary" onClick={e => this.navigateViewItemsPage(e,item.id)}>Go To Items</button>
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

export default viewVehicleCategory;
