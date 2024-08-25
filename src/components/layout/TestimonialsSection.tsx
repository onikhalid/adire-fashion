import React from 'react'
import { faker } from '@faker-js/faker';
import { Carousel, CarouselContent, CarouselDots, CarouselItem, LinkButton } from '../ui';
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image';

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  testimonial: string;
  rating: number;
  company: string;
  position: string;
}

// Function to generate a single testimonial
const generateTestimonial = (): Testimonial => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  avatar: faker.image.avatar(),
  testimonial: faker.lorem.paragraph(),
  rating: faker.number.int({ min: 3, max: 5 }),
  company: faker.company.name(),
  position: faker.person.jobTitle(),
});

// Generate an array of testimonials
const generateTestimonials = (count: number): Testimonial[] => {
  return Array.from({ length: count }, generateTestimonial);
};

const TestimonialsSection = () => {
  const mockTestimonials = generateTestimonials(10);
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, })
  )


  return (
    <div className='relative w-full max-w-[1560px] mx-auto my-20'>
      <h3 className="font-medium text-5xl text-center text-balance">What people all over the world are saying about us</h3>

      <div className='flex flex-col w-full'>
        <Carousel className='w-full md:w-[90%] h-full max-w-[1360px] mx-auto mt-8'
          plugins={[plugin.current]}
        >
          <CarouselContent className="relative h-full items-stretch ">
            {
              mockTestimonials.map((testimony, index) => (
                <CarouselItem key={index} className='lg:basis-1/3 px-4'>
                  <article className="flex flex-col relative bg-[#F5F6F8] rounded-xl p-8 lg:mx-4 size-full">

                    <p className="text-sm mb-4">{testimony.testimonial}</p>
                    <div className="flex items-center gap-4 mt-auto">
                      <Image height={45} width={45} src={testimony.avatar} alt={testimony.name} className="w-12 h-12 rounded-full text-xs" />
                      <div>
                        <h4 className="font-semibold text-lg">{testimony.name}</h4>
                        <p className="text-gray-500 text-sm">{testimony.position} at {testimony.company}</p>
                      </div>
                    </div>
                  </article>

                </CarouselItem>
              ))
            }
          </CarouselContent>
          <CarouselDots
            className="mt-10 flex items-center"
            dotClassName="bg-gray-300 hover:bg-gray-400 h-2.5 w-2.5"
            activeDotClassName="bg-[#3734A8] hover:bg-[#3734A8]/70 w-8 h-2.5 scale-1"

          />
        </Carousel>

        <LinkButton href="/" className="px-12 py-4 mt-16 self-center h-12 max-w-max" size="lg">
          See all reviews
        </LinkButton>
      </div>
    </div>
  )
}

export default TestimonialsSection