import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker';
import FeaturedProductsFilter from './FeaturedProductsFilter';
import FeaturedProductsList from './FeaturedProductsList';


export interface TProduct {
  id: string
  name: string
  description: string
  price: string
  size: 'MALE' | 'FEMALE'
  image: string
}

export interface TCartItem extends TProduct {
  quantity: number;
}


const FeaturedProducts: React.FC = () => {
  const [filterUrl, setFilterUrl] = useState<string | null>(null)
  const [products, setProducts] = useState<TProduct[]>([])

  useEffect(() => {
    const mockProducts: TProduct[] = Array.from({ length: 100 }, () => ({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      size: faker.helpers.arrayElement(['MALE', 'FEMALE']) as 'MALE' | 'FEMALE',
      image: faker.image.urlLoremFlickr({ category: 'fashion' }) 
    }))
    setProducts(mockProducts)
  }, [])

  return (
    <section className="pt-16 pb-8 max-w-[1440px] w-[90%] mx-auto">
      <h2 className="font-medium text-5xl text-center">Our featured store</h2>
      <div className='relative lg:grid grid-cols-[0.3fr,0.7fr]'>
        <FeaturedProductsFilter setFilterUrl={setFilterUrl} />
        <FeaturedProductsList products={products} />
      </div>
    </section>
  )
}

export default FeaturedProducts
