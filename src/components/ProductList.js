import React, { Component } from 'react'
import Product from './Product'
import Title from './Title'
import { ProductConsumer } from '../ProductProvider'
import styled from 'styled-components'

export default class ProductList extends Component {
    
    render() {
        return (
            <React.Fragment>
                <ProductListWrapper className="py-5">
                    <div className="container">
                        <Title name="our" title='products' />
                        <div className="row">
                            <ProductConsumer>
                                {data => {
                                    return data.products.map(product => {
                                        return <Product key={product.id} product={product} />
                                    })
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </ProductListWrapper>
            </React.Fragment>
        )
    }
}

const ProductListWrapper = styled.section``;