import React, { Component } from 'react';
import { gateway as MoltinGateway } from '@moltin/sdk';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faShoppingBag, faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faSpinner, faShoppingBag, faTrash)

const Moltin = MoltinGateway({
    grant_type: 'client_credentials',
    client_id: '3SyDptEw4tahqfb68D24ZBOdhrSutMvbIE9s3uZ4jB',
   
 })

class CartItems extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            didMount: false,
           
        }
    }
 
    componentDidMount() {
        const reference =  'c0c8ffbb507a63ce1159d89a6fcbb9f';

        Moltin.Cart(reference)
        .Items()
        .then(cartItm => {
            this.setState({
                items: cartItm.data,
                didMount: true,
            })
            console.log(this.state.items)
            // Do something
        })

    }

    
    render() {
        let ready = this.state.didMount;
        if (ready === false) {
            return (
                <div>
                <div class="App-logo"></div>
            </div>
            )
        } else {
            let cartItems = this.state.items;
            return (
                <div>
                    {cartItems.map((itm, index) => (
                    <>
                   
                        
                        
                        <Link to={{
                                        pathname: `/cart/${itm.id}`,
                                        state: {
                                            data: itm,
                                            prod: itm.title,
                                            prodId: itm.product_id,
                                            id: itm.id,
                                            prImg: itm.image.href,
                                    }
                                 }}><img className="cart-product-image" key={index} src={itm.image.href} alt="Product-Logo"/></Link>
                        <h4 className="product-title">{itm.name}</h4>
                                        <p className="cart-quant">Quantity: {itm.quantity}</p>
                                        <p className="cart-quant">Value: {itm.meta.display_price.without_tax.value.formatted}</p>
                                       
                    </>
                    ))}
                    
                </div>
            );

        }
       
       
    }
}

export default CartItems;