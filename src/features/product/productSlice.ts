import { createAppAsyncThunk } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type Product = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};

export interface ProductState {
  products: Product[];
  status: "idle" | "pending" | "succeeded" | "rejected";
  error: string | null | undefined;
}

export const fetchProducts = createAppAsyncThunk<Product[]>("", async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  const data = await response.data;
  return data;
});

const initialState = {
  products: [],
  status: "idle",
  error: null,
} as ProductState;

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.status = "succeeded";
        state.products = action.payload;
      }
    );
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
