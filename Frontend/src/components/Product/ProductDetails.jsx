import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../Redux/slices/productsSlice";
import { addItemToCart } from "../../Redux/slices/cartSlice";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProducts, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);
  const [mainImg, setMainImg] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId && productFetchId !== "undefined") {
      dispatch(fetchProductDetails({ id: productFetchId }));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProducts?.images?.length > 0) {
      setMainImg(selectedProducts.images[0].url);
    }
  }, [selectedProducts]);

  const handleQuantity = (action) => {
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);

    if (action === "plus") setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select a Size and Color before adding to Cart", {
        duration: 1000,
      });
      return;
    }
    setIsButtonDisabled(true);

    dispatch(
      addItemToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Product added to cart"),
          {
            duration: 1000,
          };
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (loading) {
    <p>Loading...</p>;
  }
  if (error) {
    <p>Error: {error}</p>;
  }
  return (
    <div className="p-6">
      {selectedProducts && (
        <div className="max-w-6xl mx-auto bg-white p-8 rounded">
          <div className="flex flex-col md:flex-row">
            {/* Left Thumbnails */}
            <div className="hidden md:flex flex-col gap-x-4 mr-6">
              {selectedProducts?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `thumbnail${index}`}
                  onClick={() => setMainImg(image.url)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border mb-1 ${
                    mainImg === image.url ? "border-black" : "border-gray-300"
                  }`}
                />
              ))}
            </div>
            {/* Main Image */}
            <div className="md:w-1/2">
              <div className="mb-4">
                <img
                  src={mainImg}
                  alt="Main Product"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
            {/* Mobile Thumbnail */}
            <div className="md:hidden flex overscroll-x-auto gap-x-4 mb-4">
              {selectedProducts?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `thumbnail${index}`}
                  onClick={() => setMainImg(image.url)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border mb-1 ${
                    mainImg === image.url ? "border-black" : "border-gray-300"
                  }`}
                />
              ))}
            </div>
            {/* Right Side  */}
            <div className="md:w-1/2 md:ml-10">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                {selectedProducts.name}
              </h1>
              <p className="text-l text-gray-600 mb-1 line-through">
                {selectedProducts?.originalPrice &&
                  `${selectedProducts?.originalPrice}`}
              </p>
              <p className="text-xl text-gray-500 mb-2 ">
                {selectedProducts.price}
              </p>
              <p className="text-gray-600 mb-4">
                {" "}
                {selectedProducts.description}
              </p>
              <div className="mb-4">
                <p className="text-gray-700 ">Color:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProducts.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color
                          ? "border-4 border-black"
                          : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor: color.toLocaleLowerCase(),
                        filter: "brightness(0.5)",
                      }}
                    ></button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700">Size:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProducts.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded border ${
                        selectedSize === size ? "bg-black text-white" : ""
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 "> Quantity:</p>
                <div className="flex items-center gap-x-4 mt-2">
                  <button
                    onClick={() => handleQuantity("minus")}
                    className="px-2 py-1 bg-gray-200 rounded text-lg"
                  >
                    -
                  </button>
                  <span className="text-lg ">{quantity}</span>
                  <button
                    onClick={() => handleQuantity("plus")}
                    className="px-2 py-1 bg-gray-200 rounded text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isButtonDisabled}
                className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${
                  isButtonDisabled
                    ? "cursor-not-allowed opacity-50 "
                    : "hover:bg-gray-900"
                }`}
              >
                {isButtonDisabled ? "Adding...." : " Add to Cart"}
              </button>

              <div className="mt-10 text-gray-700">
                <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
                <table className="w-full text-left text-sm text-gray-600 ">
                  <tbody>
                    <tr>
                      <td className="py-1 text-gray-800 ">Brand</td>
                      <td className="py-1 ">{selectedProducts.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1 text-gray-800">Material</td>
                      <td className="py-1 ">{selectedProducts.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-2xl text-center font-medium mb-4 ">
              You May Also Like
            </h2>
            <ProductGrid
              products={similarProducts}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
