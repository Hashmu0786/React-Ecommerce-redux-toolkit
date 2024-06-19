
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../store/productSlice';

function AddProduct() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [price, setPrice] = useState('');

    const dispatch = useDispatch();
    const addStatus = useSelector((state) => state.product.addStatus);
    const addError = useSelector((state) => state.product.addError);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addProduct({ title, description, thumbnail, price }));
        setDescription('');
        setTitle('');
        setThumbnail('');
        setPrice('');
    };

    return (
        <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex justify-center mx-auto">
                <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="Logo" />
            </div>

            <form className="mt-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title" className="block text-sm text-gray-800 dark:text-gray-200">Product Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="description" className="block text-sm text-gray-800 dark:text-gray-200">Product Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    ></textarea>
                </div>

                <div className="mt-4">
                    <label htmlFor="imageUrl" className="block text-sm text-gray-800 dark:text-gray-200">Image URL</label>
                    <input
                        type="text"
                        id="thumbnail"
                        value={thumbnail}
                        onChange={(e) => setThumbnail(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="price" className="block text-sm text-gray-800 dark:text-gray-200">Product Price</label>
                    <input
                        type="text"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                    >
                        Add Product
                    </button>
                </div>
            </form>
            {addStatus === 'loading' && <p>Adding product...</p>}
            {addStatus === 'failed' && <p className="text-red-500">{addError}</p>}
        </div>
    );
}

export default AddProduct;


