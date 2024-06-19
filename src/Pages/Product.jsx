
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, setCurrentPage } from '../store/productSlice';
import { addToCart } from '../store/cartSice';
import { ShimmerPostItem } from "react-shimmer-effects";


export default function Product() {

    const [page, setPage] = useState()

    const dispatch = useDispatch();
    const { isLoading, error, data, totalItems, currentPage, itemsPerPage, title, addStatus } = useSelector((state) => state.product);

    useEffect(() => {
        const skip = (currentPage - 1) * itemsPerPage;
        dispatch(fetchData({ limit: itemsPerPage, skip, title }));
    }, [dispatch, currentPage, itemsPerPage, title, addStatus]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleClickPrevious = () => {
        if (currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1));
        }
    };

    const handleClickNext = () => {
        const lastPage = Math.ceil(totalItems / itemsPerPage);
        if (currentPage < lastPage) {
            { page ? dispatch(setCurrentPage(page)) : dispatch(setCurrentPage(currentPage + 1)) }

        }
    };

    let content;

    if (isLoading) {
        // content = <div>Loading...</div>;
        content = <> <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
            <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            <div className="flex items-center mt-4">
                <svg className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                    <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
        </>
    } else if (error) {
        content = <div>{error}</div>;
    } else {
        content = (
            <div className="flex flex-wrap justify-center items-center">
                {data.map((item) => (
                    <div key={item.id} className="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 mx-2 my-4 ">
                        <div className="px-4 py-2">
                            <h1 className="text-xl font-bold text-gray-800 uppercase dark:text-white">{item.title}</h1>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                        <img className="object-cover w-full h-48 mt-2" src={item.thumbnail} alt={item.title} />
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
                            <h1 className="text-lg font-bold text-white">${item.price}</h1>
                            <button onClick={() => handleAddToCart(item)} className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
                                Add to cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            {content}
            <div className="flex mt-4">
                <button onClick={handleClickPrevious} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" disabled={currentPage === 1}>
                    Previous
                </button>
                <div className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg mx-2">
                    Page {currentPage} of {Math.ceil(totalItems / itemsPerPage)}
                </div>
                <button onClick={handleClickNext} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}>
                    Next
                </button>
                <div className='flex'>
                    <input type="number" placeholder="Jump to Page no"
                        onChange={(e) => setPage(e.target.value)}
                        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg mx-2 ml-24">
                    </input>
                    <button onClick={handleClickNext} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}>
                        Jump
                    </button>
                </div>
            </div>
        </div>
    );
}
