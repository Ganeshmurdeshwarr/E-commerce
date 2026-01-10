import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { fetchProductDetails } from "../../Redux/slices/productsSlice";
import {  updateProduct } from "../../Redux/slices/adminProductSlice";



const EditProductPage = () => {

  const  dispatch = useDispatch()
  const navigate = useNavigate();
  const {id} = useParams()
  const { selectedProducts, loading, error } = useSelector(
    (state) => state.products
  );

 const [uploading , setUploading] = useState(false)

 const [productData, setProductData] = useState({
   name: "",
   description: "",
   price: 0,
   countInStock: 0,
   sku: "",
   category: "",
   brand: "",
   sizes: [],
   colors: [],
   collections: "",
   material: "",
   gender: "",
   images: [],
 });

 useEffect(()=>{
  if(!id) return
    dispatch(fetchProductDetails(id))
  
 },[dispatch , id])

 useEffect(()=>{
  if(selectedProducts){
   setProductData({
     name: selectedProducts.name || "",
     description: selectedProducts.description || "",
     price: selectedProducts.price || 0,
     countInStock: selectedProducts.countInStock || 0,
     sku: selectedProducts.sku || "",
     category: selectedProducts.category || "",
     brand: selectedProducts.brand || "",
     sizes: selectedProducts.sizes || [],
     colors: selectedProducts.colors || [],
     collections: selectedProducts.collections || "",
     material: selectedProducts.material || "",
     gender: selectedProducts.gender || "",
     images: selectedProducts.images || [],
   });

  }
 },[selectedProducts])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 const handleImageUpload = async (e)=>{
  const file = e.target.files[0];
   const formData =new FormData();
   formData.append("image", file)

   try {
    setUploading(true)
    const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, formData,
      {
      headers:{ "Content-Type": "multipart/form-data"},
    }
    );

    setProductData((prevData)=>({
      ...prevData,
      images:[...prevData.images,{url:data.imageUrl , altText:""}],
    }))
    setUploading(false)
   } catch (error) {
    console.error(error);
    setUploading(false)
    
   }

 }

const handleSubmit = async(e)=>{
  e.preventDefault();
await dispatch(updateProduct({id ,...productData}))  
navigate("/admin/products")

}

if(loading) return <p>Loading...</p>
if(error) return <p>Error: {error}</p>

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md bg-linear-to-b from-gray-300 to-gray-400">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>

      {/* Form  */}
      <form onSubmit={handleSubmit}>
        {/*Name  */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 ">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border border-gray-900 rounded-md p-2"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 ">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full border border-gray-900 rounded-md p-2"
            rows={6}
            required
          />
        </div>

        {/* Price  */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 ">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-900 rounded-md p-2"
            rows={6}
            required
          />
        </div>

        {/* Count In Stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 ">Count in stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-900 rounded-md p-2"
            required
          />
        </div>

        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 ">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-900 rounded-md p-2"
            required
          />
        </div>

        {/* Size */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 ">
            Sizes (comma-separated)
          </label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(",")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            className="w-full border border-gray-900 rounded-md p-2"
            required
          />
        </div>

        {/* Colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 ">
            Colors (comma-separated)
          </label>
          <input
            type="text"
            name="colors"
            value={productData.colors.join(",")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              })
            }
            className="w-full border border-gray-900 rounded-md p-2"
            required
          />
        </div>

        {/* image Upload */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 ">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageUpload}
            className="bg-gray-500 w-1/4 py-2 px-1 rounded-2xl pl-4 "
          />
          {uploading && <p>Uploading Image...</p>}
          <div className="flex gap-4 mt-4 ">
            {productData.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={image.altText || "Product Image"}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 py-2 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
