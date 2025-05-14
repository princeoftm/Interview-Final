import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles

// import required modules
import { Navigation } from "swiper";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import Button from "../Button/Button";
import CreatorCard from "../CreatorCard/CreatorCard";
import NftCard from "../NftCard/NftCard";

const NavigationSwiper = ({ type, titleImg, title, moreBtn, items, ...props }) => {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    return (
        <div className="flex flex-col mb-14">
            <div className="flex md:flex-row flex-col gap-y-3 items-center justify-between mb-8">
                <div className='flex items-center'>
                    <Image src={titleImg} alt="hot" width={24} height={24} />
                    <span className='ml-2 text-lg font-medium text-trout'>{title}</span>
                </div>
                <div className="flex items-center">
                    <div ref={navigationPrevRef}>
                        <div className="flex items-center justify-center w-12 h-12 rounded-full cursor-pointer bg-gallery">
                            <ChevronLeftIcon
                                className="w-5 h-5 text-pale-sky"
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                    <div ref={navigationNextRef}>
                        <div className="flex items-center justify-center w-12 h-12 ml-4 rounded-full cursor-pointer bg-gallery">
                            <ChevronRightIcon
                                className="w-5 h-5 text-pale-sky"
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                    <Button className="ml-6 text-lg text-orange">{moreBtn}</Button>
                </div>
            </div>

            <Swiper
                slidesPerView={'auto'}
                spaceBetween={24}
                modules={[Navigation]}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                }}
                className={props.swiperClassName}
            >
                {items?.map((item, idx) => (
                    <SwiperSlide key={idx} className="md:w-1/4">
                        {
                            type == 'creator' ?
                                <CreatorCard item={item} id={idx} className="w-full h-full rounded-[16px] p-3 bg-white border-solid border border-vermilion/[0.16]" />
                                : <NftCard item={item} id={idx} className="w-full h-full rounded-[10px] bg-athens-gray relative" />

                        }
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>)
}

export default NavigationSwiper;