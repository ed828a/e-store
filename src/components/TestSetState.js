import React, { Component } from 'react'
import { ButtonContainer } from './Button'
import { storeProducts, detailProduct } from '../data'

export default class TestSetState extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: [],
            details: detailProduct,
            cart: [],
            modalOpen: false,
            modalProduct: detailProduct,
            cartSubtotal: 0,
            cartTax: 0,
            cartTotal: 0,
            counter: 0
        }
    }

    // make a copy of storeProducts
    setProducts = () => {
        let tempProduct = [];
        storeProducts.forEach(item => {
            const singleItem = { ...item };
            tempProduct = [...tempProduct, singleItem];
        })
        this.setState(() => {
            return { products: tempProduct }
        })
    }

    componentDidMount() {
        this.setProducts();
    }

    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    } 

    addToCart = (id) => {
        let tempProduct = [...this.state.products];
        const index = tempProduct.indexOf(this.getItem(id));
        const product = tempProduct[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price * product.count;
        console.log(product);
        // this.state ={
        //     // ...this.state,
        //     products: [...tempProduct],
        //     cart: [...this.state.cart, product],
        //     details: {...product}
        // };

        // this.setState(() => {
        //     return {
        //         cart: [...this.state.cart, product],
        //         counter: id
        //     };
        // }, () => {
        //     console.log(this.state)
        // });

        this.setState(() =>{
            return {
                ...this.state,
                products: tempProduct,
                cart: [...this.state.cart, product],
                details: {...product},
                counter: id
            };
        }, () => {
            console.log(this.state)
        });
        
    };

    handleClick = () => {
        let count = this.state.counter + 1;
        if(count === 8) count = 1;
        this.addToCart(count);

    }

    render() {
        return (
            <div>
                <ButtonContainer cart onClick={this.handleClick}>
                    add to cart
                </ButtonContainer>
            </div>
        )
    }
}
