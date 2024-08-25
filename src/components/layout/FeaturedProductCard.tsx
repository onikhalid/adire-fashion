import React from 'react'
import { TProduct } from './FeaturedProductsSection'
import Image from 'next/image'
import { ShoppingCartIcon } from 'lucide-react'
import { useCartStore } from '@/stores/cart'

interface FeaturedProductCardProps {
    product: TProduct
}
const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({ product }) => {
    const { add_item } = useCartStore()
    return (
        <article className='p-2 rounded-lg shadow-md'>
            <div className='relative aspect-square w-full rounded-lg overflow-hidden'>
                <Image src={product.image} alt={product.name} layout='fill' objectFit='cover' />

            </div>
            <div className='flex flex-col gap-1 p-1.5 '>
                <h4 className="font-semibold text-sm">{product.name}</h4>
                <footer className='flex items-center justify-between'>
                    <p className='text-sm'>{product.price}</p>
                    <button className='flex items-center justify-center p-1.5 rounded-md bg-blue-500 text-white' onClick={() => add_item(product)}>
                        <ShoppingCartIcon size={24} />
                    </button>
                </footer>
            </div>
        </article>
    )
}

export default FeaturedProductCard