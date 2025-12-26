import React from 'react'
import mensCollection from '../../assets/mens-collection.webp'
import women_Collection from '../../assets/womens-collection.webp'
import { Link } from 'react-router-dom';

const GenderCollectionSector = () => {
  return (
    <section className=" py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-x-8">
        {/* Women's-collection */}
        <div className="relative flex-1">
          <img
            src={women_Collection}
            alt="women_Collection"
            className="object-cover w-full h-145 "
          />

          <div className="absolute left-10 bottom-10 bg-white/90 p-4">
            <h1 className="text-2xl font-black text-gray-900 mb-3">
              Women's Collection
            </h1>
            <Link
              to="/collections/all?gender=Women"
              className="text-gray-900
            underline"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Men's Collection */}
        <div className="relative flex-1">
          <img
            src={mensCollection}
            alt="mensCollection"
            className="object-cover w-full h-145"
          />

          <div className="absolute left-10 bottom-10 bg-white bg-opacity/90 p-4">
            <h1 className="text-2xl font-black text-gray-900 mb-3">
              Men's Collection
            </h1>
            <Link
              to="/collections/all?gender=Men"
              className="text-gray-900
            underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GenderCollectionSector