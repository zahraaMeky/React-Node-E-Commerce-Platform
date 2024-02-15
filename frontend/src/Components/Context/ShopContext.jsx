import React, { createContext, useState } from "react";
// import all_product from '../Assets/all_product';
import { useEffect } from "react";

export const ShopContext = createContext(null);
const getDefaultCart=()=>{
    let Cart = {}
    for (let index = 0; index < 300+1; index++) {
        Cart[index] = 0;
    }
    
    return Cart;
}

const ShopContextProvider = (props) => {
    const [cartItems,setcartItems]=useState(getDefaultCart());
    const [all_product,setAll_Product]=useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    // Add a function to fetch cart data for authenticated users
    const fetchCartData = () => {
        fetch(`${apiUrl }/getcartData`, {
            method: "POST",
            headers: {
                "auth-token": `${localStorage.getItem('auth-token')}`,
                "Content-Type": "application/json"
            },
            body: ""
        })
        .then((response) => response.json())
        .then((data) => setcartItems(data))
        .catch((error) => console.error("Error fetching cart data:", error));
    };

    useEffect(() => {
        fetch(`${apiUrl }/allproducts`)
            .then((response) => response.json()) 
            .then((data) => setAll_Product(data));
    
        // Fetch cart data if user is authenticated
        if (localStorage.getItem('auth-token')) {
            fetchCartData();
        }
    }, []);
    
    const addToCart = (itemId) => {
        setcartItems((prev) => {
            return { ...prev, [itemId]: prev[itemId] + 1 };
        });
    
        if (localStorage.getItem('auth-token')) {
            fetch(`${apiUrl }/addtocart`, {
                method: "POST",
                headers: {
                    "auth-token": `${localStorage.getItem('auth-token')}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "itemId": itemId })
            })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error("Error adding to cart:", error));
        }
    };
    
    const removeFromCart = (itemId) => {
        setcartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId] > 0) {
                updatedCart[itemId] -= 1;
            }
            return updatedCart;
        });
    
        if (localStorage.getItem('auth-token')) {
            fetch(`${apiUrl }/removefromcart`, {
                method: "POST",
                headers: {
                    "auth-token": `${localStorage.getItem('auth-token')}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "itemId": itemId })
            })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error("Error removing from cart:", error));
        }
    };
    
    const getTotalcartAmount = () => {
        let totalAmount = 0; 
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        console.log(totalAmount); 
        return totalAmount; 
    };
    const getTotalCartItem =()=>{
        let totalItem =0;
        for (const item in cartItems){
            if (cartItems[item]>0){
                totalItem += cartItems[item];
            }
        }
        return totalItem;
     }
   
    const contextValue = { getTotalCartItem,getTotalcartAmount ,all_product,cartItems,addToCart, removeFromCart};

  
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
