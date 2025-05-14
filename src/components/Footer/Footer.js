import React from 'react'
import Image from 'next/image'

import { MailIcon } from "@heroicons/react/solid";
import Button from '../Button/Button';
import Link from 'next/link'

function NavLink({ to, children, ...props }) {
    return <a href={to} {...props}>
        {children}
    </a>
}

const Footer = () => {
    const footerLinks = [
        {
            title: 'Resources', content: [
                { name: 'User Guide', to: '/' },
                { name: 'Blog', to: '/' },
                { name: 'Give Feedback', to: '/' },
            ]
        },
        {
            title: 'Legal', content: [
                { name: 'Term of Use', to: '/' },
                { name: 'Privacy Policy', to: '/' },
            ]
        },
        {
            title: 'Stats', content: [
                { name: 'Ranking', to: '/' },
                { name: 'Activities', to: '/' },
            ]
        },
        {
            title: 'Company', content: [
                { name: 'Contact Us', to: '/' },
                { name: 'About Us', to: '/' },
            ]
        },
        {
            title: 'Service', content: [
                { name: 'Buy NFT', to: '/' },
            ]
        }
    ];
    return (
        <div className='flex flex-col px-9 bg-gray-900 text-white'>
            <div className='flex flex-col md:flex-row pt-14'>
                <div className='flex flex-col pr-2'>
                    <div className="flex items-center mb-6">
                        <Link href="/">
                            <a className="flex items-center text-lg md:text-2xl font-bold">
                                <Image src="/assets/logo.svg" alt='logo' width={48} height={40} />
                                <div className='pl-3'>PayByMint</div>
                            </a>
                        </Link>
                    </div>
                    <span className='text-base leading-6 text-rolling-stone md:max-w-[230px] mb-4'>PayByMint powered by Poulina smart contract.
Please reach out to us on the email below for any suggestions, partnerships, complaints or requests. </span>
                    <a className='flex items-center' href='mailto:hello@paybymint.com'>
                        <MailIcon
                            className='w-5 h-5 mr-3 text-white'
                            aria-hidden="true"
                        />
                        hello@paybymint.com
                    </a>
                </div>
                <div className='flex md:flex-row flex-1 flex-wrap'>
                    {
                        footerLinks.map((item, idx) => (
                            <div className='flex flex-col mt-5 w-1/2 md:flex-1' key={idx}>
                                <span className='title text-white/[0.8] font-medium text-lg mb-3'>{item.title}</span>
                                {
                                    item.content.map((cItem, cIdx) => (
                                        <NavLink to={cItem.to} className='text-white/[0.7] mb-4 text-base' key={cIdx}>{cItem.name}</NavLink>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="py-2">
                <span className="font-bold">Contact Address : </span>
                734 States Street Mississauga Ontario.
                Canada
                <br/>
                <br/>
                <span className="font-bold">Telephone : </span>

                +13065510212
            </div>

            <div className='flex flex-col md:flex-row items-center pt-20 pb-8'>
                <div>
                    <Button type="button" icon="youtube" className='h-8 md:mr-10 w-11 mr-2'></Button>
                    <Button type="button" icon="instagram" className='w-8 h-8 md:mr-10 mr-2'></Button>
                    <Button type="button" icon="linkedin" className='w-8 h-8 md:mr-10 mr-2'></Button>
                    <Button type="button" icon="facebook" className='w-8 h-8 md:mr-24 mr-2'></Button>
                </div>
                <Button type="button" icon="copyright" iconClass="mr-2 text-white" className='flex items-center text-white/[0.5]'>2022 PayByMint inc.</Button>
            </div>
        </div >
    )
}


export default Footer;