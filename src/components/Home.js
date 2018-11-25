import React, { Component } from 'react';
import { Row, Col, Grid} from 'react-bootstrap';
import { Link } from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <Grid>
                 <Link to ="/products"><Row className="show-grid jmbo-img">
                    <Col md={12}>
                        <div>
                        <h1 className="jmbo-img-text">New Arrivals</h1>
                        </div>
                    </Col>
                </Row></Link>
                <Row  className="show-grid">
                    <Col xs={12} md={6}>
                        <div className="jmbo-sub-img2">
                        <h1 className="jmbo-subimg-text">Women</h1>
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="jmbo-sub-img3">
                        <h1 className="jmbo-subimg-text">Men</h1>
                        </div>
                    </Col>
                </Row>
                {/*
                <Row className="show-grid">
                    <Col md={12}>
                        <div  className=" jmbo-sub-img4">
                        <h1 className="jmbo-subimg-text2">Sale</h1>
                        </div>
                    </Col>
                </Row>
                */}
            </Grid>
        );
    }
}

export default Home;
