import React, { useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../store/productSlice';

export default function Navbar() {
    const numberOfCardItems = useSelector((state) => state.cart.cart.length);


    const [search, setSearch] = useState('');
    const dispatch = useDispatch()

    const handleSearch = () => {
        console.log(search);
        dispatch(setSearchValue(search))
    }

    return (
        <header className="mb-2 px-4 shadow">
            <div className="relative mx-auto flex max-w-screen-lg flex-col py-4 sm:flex-row sm:items-center sm:justify-between">
                <Link className="flex items-center text-2xl font-black" to="/">
                    <span className="mr-2 text-3xl text-blue-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            role="img"
                            width="1em"
                            height="1em"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M6.925 16.875Q5.2 16.225 4.1 14.713Q3 13.2 3 11.25q0-1.975.938-3.513Q4.875 6.2 6 5.15q1.125-1.05 2.062-1.6L9 3v2.475q0 .625.45 1.062q.45.438 1.075.438q.35 0 .65-.15q.3-.15.5-.425L12 6q.95.55 1.625 1.35t1.025 1.8l-1.675 1.675q-.05-.6-.287-1.175q-.238-.575-.638-1.05q-.35.2-.738.287q-.387.088-.787.088q-1.1 0-1.987-.612Q7.65 7.75 7.25 6.725q-.95.925-1.6 2.062Q5 9.925 5 11.25q0 .775.275 1.462q.275.688.75 1.213q.05-.5.287-.938q.238-.437.588-.787L9 10.1l2.15 2.1q.05.05.1.125t.1.125l-1.425 1.425q-.05-.075-.087-.125q-.038-.05-.088-.1L9 12.925l-.7.7q-.125.125-.212.287q-.088.163-.088.363q0 .3.175.537q.175.238.45.363ZM9 10.1Zm0 0ZM7.4 22L6 20.6L19.6 7L21 8.4L17.4 12H21v2h-5.6l-.5.5l1.5 1.5H21v2h-2.6l2.1 2.1l-1.4 1.4l-2.1-2.1V22h-2v-4.6l-1.5-1.5l-.5.5V22h-2v-3.6Z"
                            />
                        </svg>
                    </span>
                    <span>future</span>
                </Link>
                <input className="peer hidden" type="checkbox" id="navbar-open" />
                <label className="absolute right-0 mt-1 cursor-pointer text-xl sm:hidden" htmlFor="navbar-open">
                    <span className="sr-only">Toggle Navigation</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="0.88em"
                        height="1em"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 448 512"
                    >
                        <path
                            fill="currentColor"
                            d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z"
                        />
                    </svg>
                </label>

                <div class="max-w-md mx-auto w-96">
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Products..." required />
                        <button type="submit"
                            onClick={handleSearch}
                            class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </div>

                <nav aria-label="Header Navigation" className="peer-checked:block hidden pl-2 py-6 sm:block sm:py-0">
                    <ul className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-8">
                        <li>
                            <Link className="text-gray-600 hover:text-blue-600" to="/">
                                Product
                            </Link>
                        </li>
                        <li>
                            <Link className="text-gray-600 hover:text-blue-600" to="/cart">
                                Cart
                            </Link>
                        </li>
                        <li>
                            <Link className="text-gray-600 hover:text-blue-600" to="/addproduct">
                                Add Product
                            </Link>
                        </li>
                        <li className="mt-2 sm:mt-0">
                            <Link to="/cart">
                                <FaShoppingCart size={34} />
                                <span className="absolute top-2 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                                    {numberOfCardItems}
                                </span>
                            </Link>
                        </li>


                    </ul>
                </nav>
            </div>
        </header>
    );
}