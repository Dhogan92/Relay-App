import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Products from './Products';
import SingleProductContainer from './SingleProductContainer';
import { Row, Col, Grid } from 'react-bootstrap';

class ProductPage extends Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col className="product-section" sm={6}>
                        <div>
                        <Route path="/products" component={Products} />  
                        </div>
                    </Col>
                    <Col className="sgl-product-section" sm={6}>
                        <Route exact path="/products/:id" component={props => <SingleProductContainer {...props} />} />
                    </Col>
                </Row>
            </Grid>
           
        );
    }
}

export default ProductPage;
