import React, { Component } from 'react';
import { gateway as MoltinGateway } from '@moltin/sdk';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faShoppingBag, faSync } from '@fortawesome/free-solid-svg-icons';

library.add(faSpinner, faShoppingBag, faSync)

const Moltin = MoltinGateway({
    client_id: '3SyDptEw4tahqfb68D24ZBOdhrSutMvbIE9s3uZ4jB',
    access_token: "9a688040aec2e291d142fac6cfe981fd2b76eb07",
    identifier: "client_credentials",
    token_type: "Bearer",
  })

class SingleCartItem extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activeProduct: [],
            productImg: [],
            didMount: false,
            inputValue: "",
        }
        this.rmFromCart = this.rmFromCart.bind(this);
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

    
    componentDidMount(){
  
          const { prodId } = this.props.location.state;
          const { prImg } = this.props.location.state;
          Moltin.Products.Get(prodId).then(product => {
              this.setState({
                  activeProduct: product.data,
                  productImg: prImg,
                  didMount: true,
                  inputvalue: this.state.inputValue,
                 
              })
              
          console.log(prodId)
            
          })
             
   
          
    }


    rmFromCart() {
          const { id } = this.props.location.state;
          const reference = 'c0c8ffbb507a63ce1159d89a6fcbb9f';
          let quantity = this.state.inputValue;

          Moltin.Cart(reference)
          .UpdateItemQuantity(id, quantity)
          .then((cart) => {
            console.log(cart)
            alert(`Updated ${this.state.activeProduct.name} to the Qty of ${quantity} ` )
           
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
        let imgLink = this.state.productImg;
        let currentCartProduct = this.state.activeProduct;
        return (
            <div>
             <div className="sgl-product-card">
            <h1 className="sgl-product-title">{currentCartProduct.name}</h1>
            <img className="sgl-product-image" src={imgLink} alt="Product-Logo"/>
            <h5 className="sgl-product-price">{currentCartProduct.meta.display_price.without_tax.formatted}</h5>
            <form onSubmit={this.handleSubmit}>
            <label>
            <h6 className="quantity-input-container">Qty:
            <input  className="quantity-input"  type="number" value={this.state.inputValue} onChange={this.handleChange} />
            </h6>
            </label>
                <button value="submit" type="submit" className="updte-cart-btn"  onClick={this.rmFromCart}><FontAwesomeIcon icon="sync" className="sync-icon" alt="sync-icon" />Update Qty</button>
            </form>
            <p className="product-description">{this.state.activeProduct.description}</p>
            
            
            
            </div>
            
            
            
            </div>
            
            
        )
    }
}

export default SingleCartItem;