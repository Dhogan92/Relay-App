import React, { Component } from 'react';
import { gateway as MoltinGateway } from '@moltin/sdk';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
library.add(faSpinner, faShoppingBag)

const Moltin = MoltinGateway({
    client_id: '3SyDptEw4tahqfb68D24ZBOdhrSutMvbIE9s3uZ4jB',
  });

class SingleProductContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activeProduct: [],
            productImg: [],
            didMount: false,
            inputValue: "",
        }
        this.addToCart = this.addToCart.bind(this);
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
        const { id } = this.props.location.state;
        const { prImg } = this.props.location.state;
        Moltin.Products.Get(id)
        .then(product => {
            this.setState({
                activeProduct: product.data,
                productImg: prImg,
                didMount: true,
                inputvalue: this.state.inputValue,
                
            }) 
            console.log(this.state.activeProduct)
        }) 
        .catch(error => console.error(error));
    }

    addToCart(){
        const reference = 'c0c8ffbb507a63ce1159d89a6fcbb9f';
        let quantity = this.state.inputValue;
        parseInt(quantity, 10);
        const { id } = this.props.location.state;
        
        Moltin.Cart(reference)
        .AddProduct(id, quantity)
        .then((cart) => {
            console.log(cart)
           alert("added " + quantity + " " + this.state.activeProduct.name +" to cart")
        }).catch(error => console.error(error));
    
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
        let currentProduct = this.state.activeProduct;
        return (
            <div className="sgl-product-card">
            <h1 className="sgl-product-title">{currentProduct.name}</h1>
            <img className="sgl-product-image" src={imgLink} alt="Product-Logo"/>
            <h5 className="sgl-product-price">{currentProduct.meta.display_price.without_tax.formatted}</h5>
            <form onSubmit={this.handleSubmit}>
            <label>
            <h6 className="quantity-input-container">Qty:
            <input  className="quantity-input"  type="number" value={this.state.inputValue} onChange={this.handleChange} />
            </h6>
            </label>
            <button value="submit" type="submit" className="add-cart-btn" onClick={this.addToCart}><FontAwesomeIcon icon="shopping-bag" className="bag-icon" alt="shoping-bag" /> Add</button> 
            </form>
            <p className="product-description">{this.state.activeProduct.description}</p>
            
            
            
            </div>
            
            
        )
    }
}

export default SingleProductContainer;
