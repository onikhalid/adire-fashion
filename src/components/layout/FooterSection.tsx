import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FooterSection = () => {
    return (
        <footer className='relative w-full max-w-[1200px] mx-auto mt-20 border-2 border-transparent border-t-[#3734A9] p-8 xl:p-12 xl:py-16'>
            <div className='flex flex-col lg:grid grid-cols-2 items-center justify-center gap-8'>
                <section className='flex flex-col gap-4'>
                    <Link href='/'>
                        <Image
                            src='/images/logo.png'
                            alt='Logo'
                            width={200}
                            height={50}
                        />
                    </Link>

                    <p className='text-[#7F848D] text-sm my-4'>
                        FashionForAll. Vestibulum non est nisl. Donec eget sodales nisl. Donec ut velit erat.
                    </p>

                    <p>&copy; 2024 All rights reserved.</p>
                </section>

                <section className='place-self-end flex max-lg:flex-col gap-10'>
                    <ul className='flex flex-col gap-3 mt-4 text-sm text-[#7F848D]'>
                        <li>
                            <Link href='/'>Home</Link>
                        </li>
                        <li>
                            <Link href='/products'>Products</Link>
                        </li>
                        <li>
                            <Link href='/contact'>Contact</Link>
                        </li>
                        <li>
                            <Link href='/'>Reviews</Link>
                        </li>
                        <li>
                            <Link href='/'>Pricing</Link>
                        </li>
                    </ul>

                    <ul className='flex flex-col gap-3 mt-4 text-sm text-[#7F848D]'>
                        <li>
                            <Link href='/'>Privacy policy</Link>
                        </li>
                        <li>
                            <Link href='/products'>Legal</Link>
                        </li>
                        <li>
                            <Link href='/contact'>Terms of service</Link>
                        </li>
                        <li>
                            <Link href='/'>Help center</Link>
                        </li>
                    </ul>

                    <Link href='/'>

                    </Link>
                </section>
            </div>
        </footer>
    )
}

export default FooterSection