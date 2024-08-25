import React from 'react'
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image";

import { BlueCheck } from "@/components/icons";
import { Carousel, CarouselContent, CarouselItem, LinkButton } from "@/components/ui";

import Header from './Header';



const Hero = () => {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true, })
      )
          const productImages = ["/images/carousel-2.png", "/images/carousel-1.png", "/images/carousel-3.png"]
    
  return (
    <section className="relative flex items-center p-0 w-full h-[100vh] max-h-[950px] [background:url('/images/hero-full.png')] overflow-y-hidden">
        <Header className="m-5 max-w-[1440px] w-[90%] mx-auto left-[50%] [transform:translateX(-50%)]" />

        <section className="flex flex-col items-center justify-center h-full basis-1/2 w-1/2 shrink-0 ">
          <div className="mx-auto max-w-xl">
            <div className="flex items-center gap-8 py-4 px-6 rounded-xl bg-white/70 text-[#757095] max-w-max">
              <span className="flex items-center gap-2">
                <BlueCheck />
                Explore
              </span>
              <span className="flex items-center gap-2">
                <BlueCheck />
                Great service
              </span>
              <span className="flex items-center gap-2">
                <BlueCheck />
                Easy payment
              </span>
            </div>

            <h1 className=" text-white font-medium text-6xl text-left text-balance leading-[6rem]">
              Getting the best and latest style has never
              <span className="block text-[#3734A9] font-bold">
                been easier!
              </span>
            </h1>

            <LinkButton href="/products" className="px-12 py-4 text-lg mt-8 justify-self-start h-16" size="lg">
              Shop collections
            </LinkButton>
          </div>


        </section>


        <section className="relative h-full basis-1/2">
          <Carousel className='w-full h-full'
            // plugins={[plugin.current]}
          >
            <CarouselContent className="relative h-full">
              {
                productImages.map((image, index) => (
                  <CarouselItem key={index} className="h-full !ml-2 !p-0">
                    <div className="relative border-[#89898949] border-[0.3px] rounded-md h-full ">
                      <Image
                        alt={`Product image ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        src={image || ""}
                      />

                    </div>
                  </CarouselItem>
                ))
              }
            </CarouselContent>
          </Carousel>
          <Image
            alt={`triangle`}
            // layout="fill"
            // fill
            width={200}
            height={500}
            objectFit="contain"
            src={"/images/hero-triangle.png"}
            className="absolute top-0 z-[2] [object-position:left] -left-[15px]"
          />
        </section>
      </section>

  )
}

export default Hero