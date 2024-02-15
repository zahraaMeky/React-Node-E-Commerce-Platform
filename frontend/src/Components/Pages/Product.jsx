import React, { useContext } from "react";
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Breadcum from "../Breadcums/Breadcum";
import ProductDisplay from "../ProductDisplay/ProductDisplay";
import DescriptionBox from "../DescriptionBox/DescriptionBox";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
function Product() {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e)=>e.id === Number(productId))

  return (
    <div className="product">
      <Breadcum product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox/>
      <RelatedProducts/>
    </div>
  )
}

export default Product
