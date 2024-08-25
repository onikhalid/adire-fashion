import { Radius, ShoppingCart, Store, Truck } from 'lucide-react'
import React from 'react'

const WhatWeDoSection = () => {
    const items = [
        {
            title: "Shop for latest wears",
            description: "We have the latest wears for you to shop from and look good in them all day long with our quality wears",
            color: "#FFF3E8",
            icon: <ShoppingCart size={30} color='#C68C57' />
        },
        {
            title: "Request for mesurment for a style",
            description: "We have the latest wears for you to shop from and look good in them all day long with our quality wears",
            color: "#F1F0FF",
            icon: <Radius size={30} color='#3734A9' />
        },
        {
            title: "Sell your wears",
            description: "We have the latest wears for you to shop from and look good in them all day long with our quality wears",
            color: "#E2F3FF",
            icon: <Store size={30} color='#167AC0' />
        },
        {
            title: "Get your wears delivered to you",
            description: "We have the latest wears for you to shop from and look good in them all day long with our quality wears",
            color: "#EDFFE7",
            icon: <Truck size={30} color='#30711A' />
        }

    ]



    return (
        <div className='relative w-full max-w-[1560px] mx-auto my-20'>
            <h3 className="font-medium text-5xl text-center">What we do</h3>

            <div className='relative grid md:grid-cols-2 drop-shadow-md shadow-sm bg-white rounded-lg max-w-[1200px] w-[90%] mx-auto my-6 min-h-[300px] z-[2] p-8 px-4 md:px-10 xl:px-16 divide-y'>
                {
                    items.map((item, index) => (
                        <div key={index} className='flex max-md:flex-col md:items-center max-md:gap-5 p-6 border-b border-[#E5E5E5] last:border-b-0'>
                            <div className='flex items-center justify-center w-16 h-16 rounded-xl '
                                style={{ backgroundColor: item.color }}
                            >
                                {item.icon}
                            </div>
                            <div className='md:ml-6'>
                                <h4 className='font-medium text-xl'>{item.title}</h4>
                                <p className='text-[0.85rem] text-[#797979] max-w-[30ch] mt-2'>{item.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className='absolute w-[20vw] max-w-[325px] aspect-square rounded-[3rem] right-0 top-0 rotate-45 bg-[#3734A9]' />
            <div className='absolute w-[20vw] max-w-[325px] aspect-square rounded-[3rem] left-0 -bottom-[15%] rotate-45 bg-[#3734A9]' />
        </div>
    )
}

export default WhatWeDoSection