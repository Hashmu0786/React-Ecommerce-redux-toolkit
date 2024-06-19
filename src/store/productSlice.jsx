
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
    data: [],
    totalItems: 0,
    currentPage: 1,
    itemsPerPage: 5,
    title: '',
    isLoading: false,
    error: null,
    addError: null,
    addStatus: null,
    newProducts: [], // Track newly added products
};

export const fetchData = createAsyncThunk('product/fetchData', async ({ limit, skip, title }) => {
    const response = await axios.get(`https://dummyjson.com/products/search?q=${title}&limit=${limit}&skip=${skip}`);
    return response.data;
});

export const addProduct = createAsyncThunk('product/addProduct', async (newProduct) => {
    const response = await axios.post('https://dummyjson.com/products/add', newProduct);
    return response.data;
});

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setSearchValue(state, action) {
            state.title = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.isLoading = false;
                const combinedData = [...state.newProducts, ...action.payload.products];
                state.data = combinedData.slice(0, state.itemsPerPage);
                state.totalItems = action.payload.total + state.newProducts.length;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addProduct.pending, (state) => {
                state.addStatus = 'loading';
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.addStatus = 'succeeded';
                state.newProducts = [action.payload, ...state.newProducts];
                state.data = [action.payload, ...state.data].slice(0, state.itemsPerPage);
                state.totalItems += 1;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.addStatus = 'failed';
                state.addError = action.error.message;
            });
    }
});

export const { setCurrentPage, setSearchValue } = productSlice.actions;

export default productSlice.reducer;
