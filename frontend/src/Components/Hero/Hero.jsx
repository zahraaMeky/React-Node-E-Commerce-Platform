import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'

function Hero() {
  return (
    <div className='hero py-5'>
      <div className='container'>
        <div className='row d-flex justify-content-md-around justify-content-center'>
          <div className='col-sm-6 '>
            <div className='hero-left'>
              <h2 className='text-uppercase '>new arrival only</h2>
              <div className='my-0'>
              <div className='hand-icon'>
                <span className='p'>new</span>
                <img src={hand_icon} alt='hand_icon'/>
              </div>
              <p className='p'>collections</p>
              <p className='p'>for evey one</p>
              </div>
              <div className='hero-latast-btn'>
                <div>latast collections</div>
                <img src={arrow_icon} alt=''/>
              </div>
            </div>
          </div>
          <div className='col-sm-4 d-flex  align-item-center'>
          <div className='hero-right'>
            <img src={hero_image}  className='img-fluid' alt='hero_image'/>
          </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Hero
