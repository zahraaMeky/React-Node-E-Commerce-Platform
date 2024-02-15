import React, { useContext } from "react";
import { ShopContext } from '../Context/ShopContext';
import './CSS/ShopCategory.css';
import dropdown_icon from '../Assets/dropdown_icon.png';
import Item from "../Item/Item";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  return (
    <div className='shop-category'>
      <img src={props.banner}  className='shop-categoy-banner' alt="banner"/>
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 product
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="dropdown_icon"/>
        </div>
      
      </div>
      <div className="shopcategory mt-3">
          <div className="container">
            <div className="row">
              {all_product.map((item) => {
                if (props.category === item.category) {
                  return (
                    <div className='col-xl-3  col-lg-4 col-md-6 mb-5 d-flex align-items-stretch' key={item.id}>
                      <Item
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                      />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
      </div>
      <div className="categoryshp-loadmore">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
