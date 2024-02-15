import React, { useEffect, useState } from 'react'
import './listproducts.css'
import cross_icon from '../../assets/cross_icon.png'
const ListProducts = () => {
  const [allproducts,setAllProducts]=useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log('apiUrl',apiUrl)

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/allproducts`);
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const removeProduct = async (id) => {
    try {
      await fetch(`${apiUrl}/remove`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
      });
      await fetchProducts();
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr/>
        {
          allproducts.map((product,index)=>{
            return(
              <>
                <div className="listproduct-format-main listproduct-format" key={index}>
                  <img src={product.image} className="listproduct-product-icon" alt='product-icon'/>
                    <p>{product.name}</p>
                    <p>${product.old_price}</p>
                    <p>${product.new_price}</p>
                    <p>{product.category}</p>
                    <img onClick={()=>{removeProduct(product.id)}} src={cross_icon} className="listproduct-product-removeicon" alt='cross_icon'/>
                </div>
                <hr/>
              </>
            )
          })
        }
      </div>
    </div>
  )
}

export default ListProducts
