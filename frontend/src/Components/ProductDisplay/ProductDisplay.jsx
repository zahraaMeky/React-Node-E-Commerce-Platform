import React, { useContext} from "react";
import { ShopContext } from "../Context/ShopContext";
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
const ProductDisplay = (props) => {
    const {product } = props
    const {addToCart} = useContext(ShopContext)

  return (
    <div className='ProductDisplay'>
       <div className="productdisplay-left">
            <div className="productdislay-img-list">
                <img  src= {product.image} alt='productimage'/>
                <img  src= {product.image} alt='productimage'/>
                <img src= {product.image} alt='productimage'/>
                <img  src= {product.image} alt='productimage'/>
            </div>
            <div className="productdisplay-img">
            <img className='productdisplay-main-img' src= {product.image} alt='productimage'/>

            </div>
       </div>
       <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-stars">
                <img src= {star_icon} alt='rateproduct'/>
                <img src= {star_icon} alt='rateproduct'/>
                <img src= {star_icon} alt='rateproduct'/>
                <img src= {star_icon} alt='rateproduct'/>
                <img src= {star_dull_icon} alt='rateproduct'/>
                <p className='m-0 '>(122)</p>
            </div>
            <div className="productdisplay-prices">
                <div className="productdisplay-old-price">${product.old_price}</div>
            <div className="productdisplay-new-price">${product.new_price}</div>
            </div>
            <div className="productdisplay-right-description">
                <p>

                lightweight, effortlessly stylish shirt,
                meticulously crafted to elevate your everyday ensemble. 
                Crafted with the finest materials, 
                this shirt boasts a feather-light feel, 
                offering unparalleled comfort without compromising on style. 
                </p>
            </div>
            <div className="productdisplay-right-size">
                <h1>select size</h1>
                <div className='productdisplay-sizes'>
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            <button onClick={()=>addToCart(product.id)}>add to cart</button>
            <p className='productdisplay-right-category'><span>Category:</span> Women, T-shirt, Crop Top</p>
            <p className='productdisplay-right-category'><span>Tags:</span> Modern, Latest</p>
        </div>
    </div>
  )
}

export default ProductDisplay
