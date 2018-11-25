import React, { Component } from 'react';
import { gateway as MoltinGateway } from '@moltin/sdk';
import { Image } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faShoppingBag, faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faSpinner, faShoppingBag, faTrash)

const Moltin = MoltinGateway({
    client_id: '3SyDptEw4tahqfb68D24ZBOdhrSutMvbIE9s3uZ4jB',
  })
  

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            didMount: false,
           
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleChange (event) {
        this.setState({
            inputValue: event.target.value,
        })
    }

    handleSubmit(event) {
       
        event.preventDefault();
    }
    

    componentDidMount() {
        const reference =  'a0b0c0e1';
        
        Moltin.Cart(reference)
        .Items()
        .then(cart => {
            this.setState({
            cartTotal: cart.data,
            didMount: true,
            })
            console.log(cart)
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
        }
        console.log(this.state.items)
        let cartItems = this.state.items;
        return (
            <div>
                {cartItems.map((itm, index) => (
                <>
               
                    
                    
                    <Image className="cart-product-image" key={index} src={itm.image.href} alt="Product-Logo"/>
                    <h4 className="product-title">{itm.name}</h4>
                                    <p className="cart-quant">Quantity: {itm.quantity}</p>
                                    <p className="cart-quant">Value: {itm.meta.display_price.without_tax.value.formatted}</p>
                                    <form onSubmit={this.handleSubmit}>
             
            <button className="rm-cart-btn"><FontAwesomeIcon icon="trash" className="trash-icon" alt="trash-icon" /> Remove Item</button>
            </form>
            
                           
                    
                    
              
                </>
                ))}
                
            </div>
        );
    }
}

export default Cart;
