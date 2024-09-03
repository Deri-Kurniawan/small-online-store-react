// import { createAppAsyncThunk } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
// import axios from "axios";

export type Cart = {
  id: number;
  productId: number;
  userId: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export interface CartState {
  carts: Cart[];
  status: "idle" | "pending" | "succeeded" | "rejected";
  error: string | null | undefined;
}

// export const fetchCarts = createAppAsyncThunk<Cart[]>("", async () => {
//   const response = await axios.get("https://fakestoreapi.com/carts");
//   const data = await response.data;
//   return data;
// });

const initialState = {
  carts: [],
  status: "idle",
  error: null,
} as CartState;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCarts: (state, action: PayloadAction<Cart[]>) => {
      state.carts = action.payload;
    },
    addToCart: (state, action: PayloadAction<Cart>) => {
      const existingProduct = state.carts.find(
        (cart) => cart.productId === action.payload.productId
      );

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
        toast.success(`Added quantity to ${existingProduct.quantity}`);
      } else {
        state.carts.push(action.payload);
        toast.success(`Added to cart`);
      }
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const cart = state.carts.find((cart) => cart.id === action.payload);
      if (cart) {
        cart.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const cart = state.carts.find((cart) => cart.id === action.payload);
      if (cart) {
        cart.quantity -= 1;
      }
    },
    deleteCart: (state, action: PayloadAction<number>) => {
      state.carts = state.carts.filter((cart) => cart.id !== action.payload);
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchCarts.pending, (state) => {
  //     state.status = "pending";
  //   });
  //   builder.addCase(
  //     fetchCarts.fulfilled,
  //     (state, action: PayloadAction<Cart[]>) => {
  //       state.status = "succeeded";
  //       state.carts = action.payload;
  //     }
  //   );
  //   builder.addCase(fetchCarts.rejected, (state, action) => {
  //     state.status = "rejected";
  //     state.error = action.error.message;
  //   });
  // },
});

export const {
  setCarts,
  addToCart,
  incrementQuantity,
  decrementQuantity,
  deleteCart,
} = cartSlice.actions;

export default cartSlice.reducer;
