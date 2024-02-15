import React from 'react'
import './RelatedProducts.css'
import data_product from '../Assets/data'
import Item from '../Item/Item'
const RelatedProducts = () => {
  return (
    <div className='related-products text-center'>
        <div className="container">
            <div className="related-products-items">
                <div className="row d-flex  justify-content-center">
                <div className="related-product-title">
                    <h1>Related Products</h1>
                    <hr/>
                </div>
                {
                        data_product.map((item,i)=>{
                           return (
                            <div className='col-xl-3  col-lg-4 col-md-6 d-flex align-items-stretch mb-5'>
                                 <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>

                            </div>
                           )

                        })
                    }
                </div>

            </div>
        </div> 
    </div>
  )
}

export default RelatedProducts
