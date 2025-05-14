import React, { useState } from "react";
import classnames from 'classnames';
import Icon from "../Icon/Icon";

const CategoryMenu = () => {
    const [active, setActive] = useState({});
    const categories = [
        { name: 'All', icon: 'category-all' },
        { name: 'Products', icon: 'technology' },
        { name : "Promotions", icon : 'ticket'},
        { name: 'Companies', icon: 'real-estate' },
        { name: 'Services', icon: 'technology' },
        { name : "Brand", icon : 'copyright'},
        { name : "Tickets", icon : 'ticket'},
    ]

    const categoryClicked = (item) => {
        setActive(item);
    };
    return (
        <div className="flex flex-col">
            <p className="text-base font-medium text-trout mb-1.5">Categories</p>
            <div className="w-56 py-3 bg-white rounded-2xl">

                {categories?.map((item, idx) => (
                    <div className={classnames('flex py-5 pl-6 mr-0.5 bg-white group cursor-pointer relative hover:bg-orange/[0.08] hover:before:block hover:before:absolute hover:before:left-0 hover:before:h-full hover:before:w-1 hover:before:top-0 hover:before:bg-orange',
                        {
                            'bg-orange/[0.08] before:block before:absolute before:left-0 before:h-full before:w-1 before:top-0 before:bg-orange': active.name === item.name,
                        })} onClick={() => categoryClicked(item)} key={`category-${idx}`} title={'Category'}>
                        <Icon type={item.icon} className={classnames('group-hover:fill-orange', { 'fill-orange': active.name === item.name })} />
                        <span className={classnames('text-base  ml-7 group-hover:text-orange group-hover:font-bold',
                            { 'text-orange font-bold': active.name === item.name, 'text-rolling-stone': active.name !== item.name })}>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default CategoryMenu;