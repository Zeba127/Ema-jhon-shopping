import React, { useEffect, useState } from 'react';
import { addToDb, getStoreCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products,setProducts] = useState([])
    const [cart,setCart] = useState([])
    useEffect( ()=>{
        console.log('fetch data load')
        fetch('products.json')
        .then(res => res.json())
        .then(data => {
            setProducts(data)
            console.log('product load')
        })
    },[])

    useEffect(()=>{
        console.log('localStorage first line',products)
        const storedCart = getStoreCart();
        const savedCart = [];
        for(const id in storedCart){
            const addProduct = products.find(product => product.id === id)
            if(addProduct){
                const quantity = storedCart[id];
                addProduct.quantity = quantity;
                savedCart.push(addProduct);
            }
            // console.log(addProduct)
        }

        setCart(savedCart);
    //    console.log('local storage finished')
    },[products])

    const handleAddToCart = (product) =>{
       
        const newCart =[...cart, product];
        setCart(newCart)
        addToDb(product.id)
    }
    return (
        <div className="shop-container">
            <div className="product-container">
               {
                products.map(product => <Product 
                    key={product.id}
                    product={product}
                    handleAddToCart ={handleAddToCart}
                    >

                    </Product>)
               }
            </div>
            <div className="cart-container">
               <Cart cart ={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;