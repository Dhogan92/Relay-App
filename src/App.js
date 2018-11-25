import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Link,
  Switch
  // etc.
} from "react-router-dom";
import Home from './components/Home';
import CheckoutContainer from './components/CheckoutContainer';
import OrderConfirmationContainer from './components/OrderConfirmationContainer';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import FooterPage from './components/FooterPage';
import NotFound from './components/NotFound';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, NavItem, } from 'react-bootstrap';

library.add(faShoppingCart, faSearch)



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <Navbar collapseOnSelect>
        <Navbar.Header>
        <Navbar.Brand className="brand-title">
        <Link to="/">RELAY</Link> 
        </Navbar.Brand>
        <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
        <Nav pullLeft className="nav-left">
        <NavItem>
        <Link to ="/" className="nav-link-text">HOME</Link>
        </NavItem>
        <NavItem>
        <Link to ="/products" className="nav-link-text">PRODUCTS</Link>
        </NavItem>
        </Nav>
        <Nav pullRight className="nav-right"t>
        <NavItem>
        <div className="cart-logo-container">
        <Link to ="/cart"><FontAwesomeIcon icon="shopping-cart" id="cart-logo"/></Link>
        </div>
        </NavItem>
        {/* <NavItem>
        <form action="/action_page.php">
          <input className="search-container" autocomplete="off" type="text" placeholder="Search.." name="search"></input>
          <button className="search-btn" type="submit"><FontAwesomeIcon icon="search" id="search-logo"/></button>
        </form>
        </NavItem> */}
        </Nav>
        </Navbar.Collapse>
        </Navbar>
        
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route path="/cart" component={CartPage} />
        <Route path="/products" component={ProductPage} />
        <Route path="/checkout" component={CheckoutContainer} />
        <Route path="/order-confirmation" component={OrderConfirmationContainer} />
        <Route path="*" component={NotFound} />
      </Switch>
      <FooterPage />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;


