import Image from 'next/image'
import React from 'react'
import { Button, LinkButton } from '../ui'
import { ArrowUpRight } from 'lucide-react'

const TrendySection = () => {
    return (
        <section className='grid lg:grid-cols-2 bg-[#3734A9] rounded-2xl overflow-hidden min-h-[450px] h-max max-w-[1440px] w-[90%] mx-auto my-16'>
            <div className='relative flex items-center justify-center h-full py-6'>
                <div className=' relative aspect-[10/16] max-h-[400px] h-full rounded-full overflow-hidden z-[2]'>
                    <Image src='/images/carousel-2.png' layout='fill' objectFit='cover' alt='trendy' />
                </div>
                <div className='absolute top-[55%] size-full bg-[#002A48] rotate-45 rounded-3xl' />
            </div>

            <div className='relative flex  items-center justify-center h-full'>

                <div className='flex  items-center justify-center absolute right-[0%] h-full max-h-[450px] aspect-square bg-[#EBEBFF] rotate-[50deg] rounded-[3rem] p-[2.5%]' >
                    <div className='flex flex-col items-end justify-center -rotate-[50deg] text-right pr-[12%]'>
                        <h3 className='text-[#3734A9] text-3xl mb-1'>Trendy Styles..</h3>
                        <p className='text-[#3734A9] text-2xl font-semibold'>Thousands styles More!</p>
                        <p className='font-normal text-xs my-2.5 !self-center'>
                            Having a pet means you have more joy, a new friend, a happy person who will always be with you to have fun. We have 200+ different pets that can meet your needs!
                        </p>
                        <LinkButton href="/" className='flex items-center gap-2 mt-4'>
                            Shop Collection <ArrowUpRight size={14} />
                        </LinkButton>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TrendySection