import React, { useContext} from "react";
import { ShopContext } from "../Context/ShopContext";
import './CartItems.css'
import remove_icon from '../Assets/cart_cross_icon.png'
const CartItems = () => {
    const {getTotalcartAmount, all_product,cartItems, removeFromCart} = useContext(ShopContext);
  return (
   <div className="cartitems">
    <div className="cartitems-format-main">
        <p >Product:</p>
        <p>Title:</p>
        <p>Price:</p>
        <p>Quantity:</p>
        <p>Total:</p>
        <p>Remove:</p>
    </div>
    <hr/>
    {all_product.map((e) => {
                if (e && cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="catitems-format cartitems-format-main">
                                <img src={e.image} className="cartitem-product-icon" alt="product-icon" />
                                <p className="m-0">{e.name}</p>
                                <p className="m-0">${e.new_price}</p>
                                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                                <p className="m-0">${e.new_price * cartItems[e.id]}</p>
                                <img src={remove_icon} onClick={() => { removeFromCart(e.id) }} className="cart-item-remove-icon" alt='remove_icon' />
                            </div>
                        </div>
                    );
                }
                return null;
            })}

        <div className="cartitems-down">
            <div className="cartitems-total">
             <h1>Cart Total</h1>
             <div>
                <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>${getTotalcartAmount()}</p>
                </div>
                <hr/>
                <div className="cartitems-total-item">
                    <p>Shopping Free</p>
                    <p>Free</p>
                </div>
                <hr/>
                <div  className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3>${getTotalcartAmount()}</h3>
                </div>
             </div>
             <button className="chekout-btn mt-3">proceed to check out</button>
            </div>
            <div className="cartitems-promocode">
                <p className="text-capitalize">if you have a promocode , enter it here</p>
                <div className="cartitem-promobox">
                    <input type="text" placeholder="promo code"/>
                    <button>submit</button>
                </div>
            </div>
        </div>
   </div>
  )
}

export default CartItems
