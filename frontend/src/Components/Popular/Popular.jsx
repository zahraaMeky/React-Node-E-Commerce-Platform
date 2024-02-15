import React, {useState,useEffect } from "react";
import './Popular.css'
import data_product from '../Assets/data'
import Item from '../Item/Item'
const Popular = () => {
  const [popularProducts,setpopularProducts]=useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/popularinwomen`)
        .then((response) => response.json()) 
        .then((data) => setpopularProducts(data));
}, []);
  return (
    <div  className='popular text-center'>
        <div className='container'>
        <h1 className='text-uppercase'>popular in women</h1>
                <hr/>
            <div className="row d-flex  justify-content-center">
         
                    {
                        popularProducts.map((item,i)=>{
                           return (
                            <div className='col-xl-3  col-lg-4 col-md-6  d-flex align-items-stretch mb-5'>
                                 <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>

                            </div>
                           )

                        })
                    }

            </div>
        </div>
      
    </div>
  )
}

export default Popular
