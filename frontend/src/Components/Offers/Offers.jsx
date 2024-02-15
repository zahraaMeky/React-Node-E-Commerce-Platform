import React from 'react'
import './Offers.css'
import exclucive_image from '../Assets/exclusive_image.png'
const Offers = () => {
  return (
    <div className='offers'>
        <div className="container">
            <div className="row">
                <div className="col-8">
                    <div className="offer-left">
                        <h1>exclucive</h1>
                        <h1>offer for you</h1>
                        <p>only on best sellers products</p>
                        <button>check now</button>
                    </div>
                </div>
                <div className="col-4">
                    <div className="offer-right">
                        <img src={exclucive_image} className='img-fluid'alt='best sellers'/>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Offers
