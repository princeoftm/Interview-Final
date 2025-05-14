import Image from 'next/image';
import React from 'react';

const CreatorCard = ({ item, id, ...props }) => {
    return (
        <div {...props}>
            <div className='relative w-full h-32'>
                <Image
                    src={`/assets/creators/${item.bgUrl}`}
                    alt={`bg-${id}`}
                    layout="fill"
                    objectFit="cover"
                    className='rounded-[10px]'
                />
            </div>
            <div className='flex flex-col items-center justify-center w-full -mt-[70px]'>
                <Image
                    src={`/assets/creators/${item.avatarUrl}`}
                    alt={`avatar-${id}`}
                    width={140}
                    height={140}
                    className='flex items-center border-8 border-white rounded-full'
                />
                <span className='text-xl text-black/[0.8] mt-1 font-medium'>{item.name}</span>
                <span className='text-base text-rolling-stone leading-[22px] px-7 mt-3 text-center'>{item.description}</span>
            </div>
        </div>
    )
};

export default CreatorCard;
