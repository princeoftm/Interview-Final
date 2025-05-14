import React from "react";
import Icon from "../Icon/Icon";

const Price = ({ coin, amount, currency }) => {
    return (
        <div className='flex flex-col items-end justify-end'>
            <p className='text-xs text-gray-500 opacity-80'>Price</p>
            <div className="flex items-center text-black">
                <Icon type={coin} className="mr-1.5" /> 
                <span className="pr-3 text-xl">{amount}</span>
                {/* <span className="text-xl font-light">({currency} 3,278)</span> */}
            </div>
        </div>
    )
}

export default Price;