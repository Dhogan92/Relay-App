import React, { Component } from 'react';
import { gateway as MoltinGateway } from '@moltin/sdk';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faShoppingBag, faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faSpinner, faShoppingBag, faTrash)

const Moltin = MoltinGateway({
    client_id: '3SyDptEw4tahqfb68D24ZBOdhrSutMvbIE9s3uZ4jB',
  })
  

class Checkout extends Component {
    constructor(props){
        super(props);
        this.state = {
            total: [],
            didMount: false,
           
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkOut = this.checkOut.bind(this);
        
    }

    handleChange (event) {
        this.componentDidMount();
        this.setState({
            total: this.state.total,
        })
       
    }

    checkOut() {
        alert("You Have Checked Out");
    }

    handleSubmit(event) {
        const reference =  'c0c8ffbb507a63ce1159d89a6fcbb9f';
    
            
            const customerId = '12345';
            const billing = {
              first_name: 'John',
              last_name: 'Doe',
              line_1: '2nd Floor British India House',
              line_2: '15 Carliol Square',
              city: 'Newcastle Upon Tyne',
              postcode: 'NE1 6UF',
              county: 'Tyne & Wear',
              country: 'United Kingdom'
            }
            Moltin.Cart(reference)
              .Checkout(customerId, billing)
              .then(order => {
                  console.log(order);
                // Do something
              })
       
        event.preventDefault();
    }
    

    componentDidMount() {
        const reference =  'c0c8ffbb507a63ce1159d89a6fcbb9f';
        const customerId = '12345';
        
        Moltin.Cart(reference)
         .Get()
          .then(cart => {
            this.setState({
                cartData: cart.data,
                total: cart.data.meta.display_price.without_tax.formatted,
                didMount: true,
            })
              
            // Do something
          })
       
    }

   componentDidUpdate() {
        const reference =  'c0c8ffbb507a63ce1159d89a6fcbb9f';
        const customerId = '12345';
        
        Moltin.Cart(reference)
         .Get()
          .then(cart => {
            this.setState({
                cartData: cart.data,
                total: cart.data.meta.display_price.without_tax.formatted,
                didMount: true,
            })
           console.log(this.state.cartData)
          })
       
   }
    
    render() {
        let ready = this.state.didMount;
        let cartInfo = this.state.cartData;
        if (ready === false) {
            return (
                <div>
                 <div class="App-logo"></div>
            </div>
            )
        }
        return (
            <div>
             <h3 className="total-title">Total: <p onChange={this.handleChange}>{cartInfo.meta.display_price.without_tax.formatted}</p>
             <button onClick={this.checkOut} className="checktout-btn"><FontAwesomeIcon icon="shopping-cart" className="trash-icon" alt="trash-icon" /> Checkout</button> 
             </h3>
            
            </div>
        );
    }
}

export default Checkout;