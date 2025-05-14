import Image from 'next/image';
import React from 'react';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Price from '../Price/Price'

const NftCard1 = ({ item, id, btnBuy, ...props }) => {
    return (
        <div {...props}>
            <img className="custom-image"
                src={item.image}
                alt={`image-${id}`}
                layout="fill"
                style={{ objectFit: 'cover' }}
            // className='rounded-[10px]'
            />

            {/* <div className='absolute bottom-0 w-full h-[100px] bg-athens-gray flex justify-between p-4 rounded-b-[10px]'>
                <div className='flex flex-col items-start justify-between'>
                    <div className='flex'>
                        <Image
                            src={`/assets/avatars/${item.avatarUrl}`}
                            alt="avatar"
                            width={32}
                            height={32}
                        />
                        <div className='flex flex-col items-start justify-between ml-3'>
                            <span className='text-xs font-medium text-pale-sky'>{item.userName}</span>
                            <Button type="button" icon="plus" iconClass="mr-1.5" className='flex items-center text-xs text-orange'>Follow</Button>
                        </div>
                    </div>
                    <span className='text-base text-shuttle-gray'>{item.title}</span>

                </div>

                <Price coin="ether" amount={0.9} currency="$" />
            </div> */}
            {
                btnBuy ?
                    <div className='absolute flex left-4 bottom-32'>
                        <Button className='py-1 text-lg bg-white text-orange px-11 rounded-3xl'>Buy</Button>
                    </div>
                    : null
            }
            {
                item.like ?
                    <div className='absolute flex items-center right-4 bottom-28'>
                        <div className='flex items-center justify-center w-6 h-6 rounded-full bg-silver mr-1.5'>
                            <Icon type={'heart'} />
                        </div>
                        <span className='text-sm text-rolling-stone'>{Intl.NumberFormat({ maximumSignificantDigits: 3 }).format(item.like)}</span>
                    </div>
                    : null
            }

        </div>

    )
};

export default NftCard1;
