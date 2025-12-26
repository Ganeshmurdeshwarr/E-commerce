import React from 'react'
import Hero from '../../components/Layout/Hero'
import GenderCollectionSector from '../../components/Product/GenderCollectionSector'
import NewArrivals from '../../components/Product/NewArrivals'
import ProductDetails from '../../components/Product/ProductDetails'
import ProductGrid from '../../components/Product/ProductGrid'
import FeatureCollection from '../../components/Product/FeatureCollection'
import FeatureSection from '../../components/Product/FeatureSection'


const placeholderProducts = [
  {
    _id: 1,
    name: "Product 1",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    _id: 1,
    name: "Product 1",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    _id: 1,
    name: "Product 1",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=3",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    _id: 1,
    name: "Product 1",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=4",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    _id: 1,
    name: "Product 1",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=4",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    _id: 1,
    name: "Product 1",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=4",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    _id: 1,
    name: "Product 1",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=4",
        altText: "Stylish Jacket",
      },
    ],
  },
  {
    _id: 1,
    name: "Product 1",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=4",
        altText: "Stylish Jacket",
      },
    ],
  },
 
];


const Home = () => {
  return (
    <div>
      <Hero/>
      <GenderCollectionSector/>
      <NewArrivals/>

      {/* Best Seller */}

      <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
      <ProductDetails/>

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid product={placeholderProducts}/>
      </div>
      <FeatureCollection/>
      <FeatureSection/>
    </div>
  )
}

export default Home