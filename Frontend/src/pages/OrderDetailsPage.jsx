import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const mockOrderDetails = {
      _id: id,
      createdAt: new Date(),
      isPaid: true,
      isDelivered: false,
      paymentMethod: "PayPal",
      shippingMethod: "Standard",
      shippingAddress: {
        name: "John Doe",
        address: "123 Broadway Ave",
        city: "New York",
        postalCode: "10001",
        country: "USA",
      },
      orderItems: [
        {
          productId: "1",
          name: "Jacket",
          price: 120,
          quantity: 1,
          image: "https://picsum.photos/150?random=1",
        },
        {
          productId: "2",
          name: "Shirt",
          price: 60,
          quantity: 2,
          image: "https://picsum.photos/150?random=2",
        },
      ],
      itemsPrice: 240,
      shippingPrice: 15,
      taxPrice: 12,
      totalPrice: 267,
    };

    setOrderDetails(mockOrderDetails);
  }, [id]);

  const formatDate = (d) => {
    if (!d) return "";
    const dt = new Date(d);
    return dt.toLocaleString();
  };

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex flex-col">
     
        <main className="container mx-auto px-4 py-20">
          <div className="text-center text-gray-500">
            No Order details found!
          </div>
        </main>
  
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Order Details</h1>
          <div className="text-sm text-gray-600">Order #{orderDetails._id}</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left / Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status */}
            <div className="p-6 bg-white shadow-sm rounded-md border">
              <h2 className="text-lg font-medium mb-3">Order Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div>
                  <p className="font-medium">Placed On</p>
                  <p className="mt-1">{formatDate(orderDetails.createdAt)}</p>
                </div>
                <div>
                  <p className="font-medium">Payment</p>
                  <p className="mt-1">
                    {orderDetails.paymentMethod} —{" "}
                    {orderDetails.isPaid ? (
                      <span className="text-green-600 font-medium">Paid</span>
                    ) : (
                      <span className="text-red-600">Pending</span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Delivery</p>
                  <p className="mt-1">
                    {orderDetails.isDelivered ? (
                      <span className="text-green-600">Delivered</span>
                    ) : (
                      <span className="text-yellow-600">Processing</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping & Payment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white shadow-sm rounded-md border">
                <h3 className="font-medium mb-2">Shipping Address</h3>
                <p className="text-sm text-gray-700">
                  {orderDetails.shippingAddress.name}
                </p>
                <p className="text-sm text-gray-700">
                  {orderDetails.shippingAddress.address}
                </p>
                <p className="text-sm text-gray-700">
                  {orderDetails.shippingAddress.city},{" "}
                  {orderDetails.shippingAddress.postalCode}
                </p>
                <p className="text-sm text-gray-700">
                  {orderDetails.shippingAddress.country}
                </p>
              </div>

              <div className="p-6 bg-white shadow-sm rounded-md border">
                <h3 className="font-medium mb-2">Payment & Shipping</h3>
                <p className="text-sm text-gray-700">
                  Method: {orderDetails.paymentMethod}
                </p>
                <p className="text-sm text-gray-700">
                  Shipping: {orderDetails.shippingMethod}
                </p>
              </div>
            </div>

            {/* Items list */}
            <div className="p-6 bg-white shadow-sm rounded-md border">
              <h3 className="font-medium mb-4">Items in this order</h3>
              <ul className="space-y-4">
                {orderDetails.orderItems.map((it) => (
                  <div key={it.productId}>
                    {" "}
                    <li className="flex items-center gap-4">
                      <img
                        src={it.image}
                        alt={it.name}
                        className="w-20 h-20 object-cover rounded-md border"
                      />

                      <div className="flex-1">
                        <Link
                          to={`/product/${it.productId}`}
                          className="font-medium hover:underline"
                        >
                          {it.name}
                        </Link>
                        <div className="text-sm text-gray-600">
                          Qty: {it.quantity}
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        ${(it.price * it.quantity).toFixed(2)}
                      </div>
                    </li>{" "}
                    <hr className="mt-5" />
                  </div>
                ))}
              </ul>
            </div>
            <div className="text-blue-500 underline">
              <Link to="/my-orders">Back to My orders</Link>
            </div>
          </div>

          {/* Right / Summary */}
          <aside>
            <div className="p-6 bg-white shadow-sm rounded-md border space-y-4">
              <h3 className="text-lg font-medium">Order Summary</h3>
              <div className="flex justify-between text-sm text-gray-700">
                <div>Items</div>
                <div>${orderDetails.itemsPrice.toFixed(2)}</div>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <div>Shipping</div>
                <div>${orderDetails.shippingPrice.toFixed(2)}</div>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <div>Tax</div>
                <div>${orderDetails.taxPrice.toFixed(2)}</div>
              </div>
              <div className="border-t pt-3 flex justify-between items-center">
                <div className="text-lg font-semibold">Total</div>
                <div className="text-lg font-semibold">
                  ${orderDetails.totalPrice.toFixed(2)}
                </div>
              </div>

              <div className="pt-2">
                <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
                  Reorder
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default OrderDetailsPage;
