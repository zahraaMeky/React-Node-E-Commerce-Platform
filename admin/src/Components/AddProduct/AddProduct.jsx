import React, { useState } from 'react';
import './addproduct.css';
import upload_area from '../../assets/upload_area.svg';
import toast, { Toaster } from 'react-hot-toast';

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    old_price: "",
    new_price: ""
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    console.log('productDetails', productDetails);
    let responseData;
    let product = { ...productDetails }; // Create a copy of productDetails
    let formData = new FormData(); // Correct case of FormData
    formData.append('product', image);
    await fetch(`${apiUrl}/upload`, {
      method: 'POST', // Correct method name
      headers: { Accept: 'application/json' },
      body: formData
    })
      .then((resp) => resp.json()) // Return the response
      .then(async (data) => {
        responseData = data;
        if (responseData.success) {
          product.image = responseData.image_url;
          console.log(product);
          // Make another request to add product
          await fetch(`${apiUrl}/addproduct`, {
            method: 'POST', // Correct method name
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
          })
            .then((resp) => resp.json())
            .then((data) => {
              if (data.success) {
                // Handle success
                toast.success('Product added successfully.');
                console.log('Product added successfully.');
                // Reset input fields
                setProductDetails({
                  name: "",
                  image: "",
                  category: "women",
                  old_price: "",
                  new_price: ""
                });
              } else {
                // Handle failure
                console.error('Failed to add product:', data.error);
                toast.error('Failed to add product: ' + data.error); 
              }
            })
            .catch((error) => console.error('Error adding product:', error));
        }
      })
      .catch((error) => console.error('Error uploading image:', error));
  };
  

  return (
    <div className='add-product'>
      <Toaster />
      <div className='add-product-items'>
        <div className="addproduct-itemfields">
          <p>Product Title</p>
          <input defaultValue={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder='Type here ..' />
        </div>
        <div className="addproduct-price">
          <div className="addproduct-itemfields">
            <p>Product Old Price</p>
            <input defaultValue={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type here ..' />
          </div>
          <div className="addproduct-itemfields">
            <p>Product New Price</p>
            <input defaultValue={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type here ..' />
          </div>
        </div>
        <div className="addproduct-itemfields">
          <p>Product Category</p>
          <select name="category" defaultValue={productDetails.category} onChange={changeHandler} className='addproduct-selector'>
            <option value="women">women</option>
            <option value="men">men</option>
            <option value="kid">kids</option>
          </select>
        </div>
        <div className="addproduct-itemfields">
          <label htmlFor='file-input'>
            <img src={image ? URL.createObjectURL(image) : upload_area} alt='upload_area' className='addproduct-thumbnail-img' />
          </label>
          <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
        </div>
        <button onClick={addProduct} className='addproduct-btn'>Add Product</button>
      </div>
    </div>
  );
};

export default AddProduct;
