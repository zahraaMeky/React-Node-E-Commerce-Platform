import React from 'react'
import './NewsLetter.css'
const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>get exclusiv oferrs on your email</h1>
        <p>subscribe to our news letter and stay updated</p>
        <div className='subscribe'>
          <input type="text" class="form-control" placeholder="Your Email ID" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
          <button>subscribe</button>
        </div>
       
    </div>
  )
}

export default NewsLetter
