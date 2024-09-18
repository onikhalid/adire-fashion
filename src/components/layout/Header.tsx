'use client'

import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LinkButton } from '../ui'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Props {
    className?: string
}
const Header: React.FC<Props> = ({ className }) => {
    const pathName = usePathname()
    const tabs = [
        {
            id: 1,
            title: 'Home',
            path: "/",
        },
        {
            id: 2,
            title: 'Products',
            path: "/products",
        },
        {
            id: 3,
            title: 'Contact',
            path: "/contact",
        },
    ]

    return (
        <header className={cn('fixed top-0 z-10 flex items-center justify-between gap-4 bg-background p-4 px-8 rounded-full w-full', className)}>
            <Link href='/' className='flex items-center gap-2 text-xl font-display'>
                <Image
                    src='/images/TRYBLogo.png'
                    alt='Logo'
                    width={40}
                    height={40}
                />
                TRYB FASHION
            </Link>

            <ul className='flex items-center gap-4'>
                {
                    tabs.map((tab) => (
                        <li key={tab.id}>
                            <LinkButton href={tab.path} variant={pathName === tab.path ? 'secondary' : 'default'}>
                                {tab.title}
                            </LinkButton>
                        </li>
                    ))
                }
            </ul>

            <div>
                <LinkButton href='/login' variant='default' className='bg-black border-2 border-transparent hover:bg-white hover:border-black hover:text-black'>
                    Login
                </LinkButton>
            </div>
        </header>
    )
}

export default Header