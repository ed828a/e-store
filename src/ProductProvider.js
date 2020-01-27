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
            cart: [],
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
        product.count = 1;
        const price = product.price;
        product.total = price * product.count;
        console.log(product);

        this.setState(() => {
            return {
                // ...this.state,
                products: tempProduct,
                cart: [...this.state.cart, product],
                details: { ...product }
            };
        }, () => {
            console.log(this.state);
            this.addTotals();
        });

    };

    openModal = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {
                // ...this.state,
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
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        selectedProduct.count += 1;
        selectedProduct.total = selectedProduct.count * selectedProduct.price;

        // const index = tempCart.indexOf(selectedProduct);
        // const product = tempCart[index];
        // product.count += 1;
        // product.total = product.count * product.price;

        this.setState(() => {
            return {
                cart: [...tempCart]
            };
        }, () => {
            this.addTotals();
        });
    }

    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        selectedProduct.count -= 1;

        if (selectedProduct.count === 0) {
            this.removeItem(id);
        } else {
            selectedProduct.total = selectedProduct.count * selectedProduct.price;

            this.setState(() => {
                return {
                    cart: [...tempCart]
                };
            }, () => {
                this.addTotals();
            });
        }

    }

    removeItem = (id) => {
        console.log('item removed.')
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);
        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            }
        }, () => {
            this.addTotals();
        });
    }
    clearCart = () => {
        this.setState(() => {
            return {
                cart: []
            }
        }, () => {
            this.setProducts();
            this.addTotals();
        })
    }
    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2)); // keep 2 digits after dot.
        const total = subTotal + tax;
        this.setState(() => {
            return {
                cartSubtotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })

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

