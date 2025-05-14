import Image from 'next/image';
import React from 'react';
import Link from 'next/link'

import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Price from '../Price/Price'
import BigNumber from 'bignumber.js'

const NftCard = ({ item, btnBuy, ...props }) => {
    const { tokenId, image, name, like, seller, price } = item
    return (
        <Link href={`/sale?tokenId=${tokenId}&seller=${seller}&price=${price}`}>
            <div {...props}>
                <Image
                    src={image}
                    alt={`image-${tokenId}`}
                    layout="fill"
                    objectFit="cover"
                    className='rounded-[10px]'
                />

                <div className='absolute bottom-0 w-full  bg-athens-gray flex justify-between p-4 rounded-b-[10px]'>
                    <div className='w-full flex justify-between'>
                        {/* <div className='flex'>
                            <Image
                                src='/assets/avatars/avatar1.png'
                                alt="avatar"
                                width={32}
                                height={32}
                            />
                            <div className='flex flex-col items-start justify-between ml-3'>
                                <span className='text-xs font-medium text-pale-sky'>Amanda Ebubechukwu</span>
                                <Button type="button" icon="plus" iconClass="mr-1.5" className='flex items-center text-xs text-orange'>Follow</Button>
                            </div>
                        </div> */}
                        <span className='text-base text-shuttle-gray'>{name}</span>
                        <Price coin="ether" amount={BigNumber(price ? price._hex : '1000000000000000000').dividedBy(BigNumber('1000000000000000000')).toString()} currency="$" />
                    </div>

                    
                </div>
                {
                    btnBuy ?
                        <div className='absolute flex left-4 bottom-32'>
                            <Button className='py-1 text-lg bg-white text-orange px-11 rounded-3xl'>Buy</Button>
                        </div>
                        : null
                }
                {
                    like ?
                        <div className='absolute flex items-center right-4 bottom-28'>
                            <div className='flex items-center justify-center w-6 h-6 rounded-full bg-silver mr-1.5'>
                                <Icon type={'heart'} />
                            </div>
                            <span className='text-sm text-rolling-stone'>{Intl.NumberFormat({ maximumSignificantDigits: 3 }).format(item.like)}</span>
                        </div>
                        : null
                }

            </div>
        </Link>
    )
};

export default NftCard;
