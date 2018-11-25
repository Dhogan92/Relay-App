import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SingleCartItem from './SingleCartItem';
import CartItems from './CartItems';
import Checkout from './Checkout';
import { Row, Col, Grid } from 'react-bootstrap';

class CartPage extends Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col className="product-section" sm={4}>
                        <div>
                            <Route path="/cart" component={CartItems} />
                        </div>
                    </Col>
                   
                    <Col className="sgl-product-section" sm={4}>
                        <Route exact path="/cart/:id" component={props => <SingleCartItem {...props} />} />
                    </Col>
                    <Col sm={4}>
                        <Route  path="/cart" component={Checkout} />
                   
                    </Col>
                </Row>
            </Grid>
           
        );
    }
}

export default CartPage;