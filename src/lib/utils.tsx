import { AppDispatch, RootState } from "@/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Redux Toolkit's `createAsyncThunk` with types
 * @see https://redux-toolkit.js.org/api/createAsyncThunk
 * @example
 * ```ts
 * export const fetchProducts = createAppAsyncThunk<Product[]>("", async () => {
 *  const response = await axios.get("https://fakestoreapi.com/products");
 *  const data = await response.data;
 *  return data;
 * });
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>();
