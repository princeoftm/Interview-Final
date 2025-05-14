import Image from "next/image";
import React from "react";

const Notification = ({ avatar, time, children }) => {
    return (
        <div className="p-2.5 bg-white shadow-[0_6px_48px_-6px_rgba(212,219,228,1)] text-sm min-w-[620px] flex items-center rounded-full">
            <Image
                src={`/assets/avatars/${avatar}`}
                width={42}
                height={42}
            />
            <div className="ml-3 ">
                <span className="ml-3 text-black/[.8]">{children}</span>
            </div>
            <div className="flex justify-end flex-1 pr-4">
                <span className="ml-3 text-black/[.32]">{time}</span>
            </div>

        </div>
    )
}

export default Notification;