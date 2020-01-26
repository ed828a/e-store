// This is a Context Provider
import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data'

const ProductContext = React.createContext()
// this come with two component: provider and consumer

class ProductProvider extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: [],
            details: detailProduct,
            cart:[],
            modalOpen: false,
            modalProduct: detailProduct,
            cartSubtotal: 0,
            cartTax: 0, 
            cartTotal: 0
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

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return { details: product }
        })
    }

    addToCart = (id) => {
        let tempProduct = [...this.state.products];
        const index = tempProduct.indexOf(this.getItem(id));
        const product = tempProduct[index];
        product.inCart = true;
        product.count =1; 
        const price = product.price;
        product.total = price * product.count;
        console.log(product);
        this.state ={
            // ...this.state,
            products: [...tempProduct],
            cart: [...this.state.cart, product],
            details: {...product}
        };
        // this.setState(() => {
        //     return {
        //         cart:[product]
        //     };
        // }, ()=>{
        //     console.log(this.state)
        // })
        // this.setState(() =>{
        //     return {
        //         ...this.state,
        //         products: tempProduct,
        //         cart: [...this.state.cart, product],
        //         details: {...product}
        //     };
        // });
        console.log(this.state)
    };

    openModal = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {
                ...this.state,
                modalProduct: product,
                modalOpen: true
            }
        })
    };

    closeModal = () => {
        this.setState(() => {
            return {
                ...this.state, 
                modalOpen: false
            }
        })
    };

    increment = (id) => {
        console.log('this is increment method')
    }

    decrement = (id) => {
        console.log('this is decrement method')
    }

    removeItem = (id) => {
        console.log('item removed.')
    }
    clearCart = () => {
        console.log("clear cart method.")
    }
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };

