import React, {useState,useEffect } from "react";
import './NewCollections.css'
// import new_colections from '../Assets/new_collections'
import Item from '../Item/Item'

const NewCollections = () => {
  const [newcollection,setNewCollection]=useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/newcollection`)
        .then((response) => response.json()) 
        .then((data) => setNewCollection(data));
}, []);

  return (
    <div className='newcollections  text-center'>
        <div className="container">
            <h1 className='text-uppercase '>new collections</h1>
            <hr/>
            <div className="row d-flex  justify-content-center ">
         
                    {
                        newcollection.map((item,i)=>{
                           return (
                            <div className='col-xl-3  col-lg-4 col-md-6 mb-5 d-flex align-items-stretch'>
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

export default NewCollections
