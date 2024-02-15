import React from 'react'
import './DescriptionBox.css'
const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptin-box-navigator">
        <div className="description-box-nav"> Description</div>
        <div className="description-box-nav review"> Reviews (122)</div>
      </div>
      <div className="description-box-description">
        <p>
        Welcome to Shopper, your ultimate destination for all things trendy, convenient, and tailored to your unique lifestyle. At Shopper, we curate a diverse range of products, meticulously selected to cater to your every need and desire.
        </p>
        <p>
        xplore our extensive collection of fashion-forward apparel, from chic wardrobe staples to statement pieces that command attention. Whether you're searching for the perfect ensemble for a night out on the town or cozy loungewear for a relaxing day at home, our carefully curated selection ensures you'll find exactly what you're looking for.
        </p>
      </div>
    </div>
  )
}

export default DescriptionBox
