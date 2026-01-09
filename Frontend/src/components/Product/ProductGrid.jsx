import React from 'react'
import { Link } from 'react-router-dom';

const ProductGrid = ({ products ,loading ,error }) => {
  if(loading){
    return <p>Loading</p>
  }

  if(error){
    return <p>Error: {error}</p>
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-4 ">
      {products?.map((product, index) => (
        <Link key={index} to={`/product/${product._id}`} className="block">
          <div className="bg-linear-to-b from-yellow-100 via-orange-100 to-red-100 p-4 rounded-lg">
            <div className="w-full h-75 mb-4">
              <img
                src={product.images[0]?.url}
                alt={product.images[0]?.altText || product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-sm mb-2 text-black">{product.name}</h3>
            <p className="text-gray-500 font-medium text-sm tracking-tighter">
              ${product.price}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid