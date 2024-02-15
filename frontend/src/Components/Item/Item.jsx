import React from 'react'
import './Item.css'
import { Link } from "react-router-dom";
const Item=(props)=> {
  return (
    <Link to={`/product/${props.id}`} className="card item mx-auto" style={{width: '18rem'}} key={props.id} onClick={window.scrollTo(0,0)}>
    <img src={props.image} className="card-img-top img-fluid " alt={props.name}/>
    <div className="card-body">
      <h5 className="card-title">{props.name}</h5>
      <div className="item-price">
      <p className="card-text new-price">${props.new_price}</p>
      <p className="card-text old-price">${props.old_price}</p>
      </div>
    </div>
  </Link>
  )
}

export default Item
