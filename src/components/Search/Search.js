import React from 'react';

const Search = ({ mode }) => {
    return (
        <div className={`relative text-${mode}`}>
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                <button className="p-1 focus:outline-none focus:shadow-outline text-orange text-opacity-40">
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12.4232 12.4278C13.5827 11.2694 14.3 9.66847 14.3 7.9C14.3 4.36538 11.4346 1.5 7.9 1.5C4.36538 1.5 1.5 4.36538 1.5 7.9C1.5 11.4346 4.36538 14.3 7.9 14.3C9.66616 14.3 11.2652 13.5846 12.4232 12.4278ZM12.4232 12.4278L16.4333 16.4379"
                            stroke="currentColor"
                            strokeWidth="1.06667"
                            strokeLinecap="square"
                        />
                    </svg>
                </button>
            </span>

            <div className="w-72">
                <input
                    type="search"
                    name="q"
                    className={`w-full py-3 px-12 text-sm bg-transparent border rounded-md border-orange border-opacity-40 focus:outline-none focus:text-gray-900`}
                    placeholder="Search Companies, Products, etc"
                    autoComplete="off"
                />
            </div>
        </div>
    );
};

export default Search;
