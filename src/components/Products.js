import React, { Component } from 'react';
import { gateway as MoltinGateway } from '@moltin/sdk';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
library.add(faSpinner)

const Moltin = MoltinGateway({
    client_id: '3SyDptEw4tahqfb68D24ZBOdhrSutMvbIE9s3uZ4jB',
  })

class Products extends Component {
    constructor(props){
        super(props);
        this.state ={
           
            clothing: [],
            productImages: [],
            didMount: false,
        }
        
    }
    componentDidMount(){
         Moltin.Products.With('main_image').All().then((products) => {
            const data = products.data
            const images = products.included.main_images

            data.forEach(pr => {
            const im = images.find(im => im.id === pr.relationships.main_image.data.id).link.href
            pr.imgUrl = im;
            })
            this.setState({
                
                clothing: data,
                productImages: images,
                didMount: true,
              })
           console.log(this.state.clothing)

          })
         
    }

    render() {
        let ready = this.state.didMount;
        if(ready === false) {
            return (
                <div>
                     <div class="App-logo"></div>
                </div>
            )
        } else {
            let latestProducts = this.state.clothing;
        return (
            <div className="grid">
                {latestProducts.map((product, index) => (       
                    <>  
                        <div className="row">
                            <Link to={{
                            pathname: `/products/${product.id}`,
                            state: {
                            data: product,
                            prod: product.title,
                            id: product.id,
                            prImg: product.imgUrl,
                            }
                            }}><img key={index} className="product-image" src={product.imgUrl} alt="Product-Logo"/></Link>
                            <h4 className="product-title">{product.name}</h4>
                        </div>
                    </>
                ))}
            </div>
        )

        }
        
    }
}

export default Products;
