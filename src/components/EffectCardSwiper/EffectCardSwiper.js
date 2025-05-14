import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import styles from './EffectCardSwiper.module.css'

// import required modules
import { EffectCards, Navigation } from "swiper";
import Image from "next/image";
import NftCard from "../NftCard/NftCard";

const EffectCardSwiper = ({ items }) => {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    return (
        <div className="relative w-[80vw] md:w-fit">
            <div
                ref={navigationPrevRef}
                className={styles.swiperButtonPrev}
            >
                <Image
                    src="/assets/icons/arrow-prev.svg"
                    alt="arrow-prev"
                    width={32}
                    height={24}
                />
            </div>
            <div
                ref={navigationNextRef}
                className={styles.swiperButtonNext}
                
            >
                <Image
                    src="/assets/icons/arrow-next.svg"
                    alt="arrow-next"
                    width={32}
                    height={24}
                />
            </div>
            <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards, Navigation]}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                }}
                className='w-full md:w-[390px] h-[435px]'
            >
                {items?.map((item, id) => (
                    <SwiperSlide
                        key={id}
                        className="flex items-center justify-center rounded-[10px]"
                    >
                        <NftCard item={item} id={id} btnBuy={true} className="w-full h-[435px] rounded-[10px] relative" />
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>)
}

export default EffectCardSwiper;