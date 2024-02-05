// productsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { emptyProduct } from '@/components/types';
interface Product {

  _id: string;
 
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('http://localhost:5000/api/products');
  return response.data;
});

export const createProduct = createAsyncThunk('products/createProduct', async (newProduct: emptyProduct) => {
  const response = await axios.post('http://localhost:5000/api/products', newProduct);
  return response.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct',async (updatedProduct: Product) => {
  const response = await axios.put(`http://localhost:5000/api/products/${updatedProduct._id}`, {name:updatedProduct.name,description:updatedProduct.description,price:updatedProduct.price});
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId: string) => {
  await axios.delete(`http://localhost:5000/api/products/${productId}`);
  return productId;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch products';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedIndex = state.products.findIndex((product) => product._id === action.payload._id);
        if (updatedIndex !== -1) {
          state.products[updatedIndex] = action.payload;
        }
      })
      
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product._id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
