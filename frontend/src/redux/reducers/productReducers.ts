import { createSlice, PayloadAction, Reducer, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AxiosError } from "axios";
import { BASE_URL } from '../../config';
import { getCsrfToken } from '../../config';
export type Product = {
  id: number,
  name: string,
  description: string,
  price: number,
  stock: number
}

interface ProductState {
  products: Product[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null | undefined;
}

const initialState: ProductState = {
  products: [],
  status: 'idle',
  error: null,
}

export const selectProduct = createAsyncThunk<void, number, { rejectValue: { errorMessage: string }}> ("product/selectProduct", async (productId: number, thunkAPI) => {
  try {
    await axios.get(`${BASE_URL}/products/${productId}/select/` , {withCredentials: true});
  } catch (error) {
    const axiosError = error as AxiosError;
    return thunkAPI.rejectWithValue({ errorMessage: axiosError.message || 'Unknown error occurred' });
  }
});

export const fetchProducts = createAsyncThunk<Product[], string>('products/fetchProducts', async (params: string) => {
  const queryParams = new URLSearchParams(params);
  const searchTerm = queryParams.get('search');
  if (searchTerm !== null && searchTerm.trim() !== '') {
    const response = await axios.get(`${BASE_URL}/products/?${params}`, {withCredentials: true});
    return response.data as Product[];
  } else {
    return [];
  }
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(selectProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(selectProduct.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(selectProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.errorMessage;
      });
  },
});

export const productReducer: Reducer<ProductState> = productSlice.reducer;