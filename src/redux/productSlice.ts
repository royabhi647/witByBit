import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  name: string;
  price: number;
  brand: string;
}

interface Category {
  category: string;
  products: Product[];
}

const initialState: Category[] = [];

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addCategory(state, action: PayloadAction<string>) {
      const existingCategory = state.find(
        (item) => item.category === action.payload
      );
      if (!existingCategory) {
        state.push({ category: action.payload, products: [] });
      }
    },
    addProduct(
      state,
      action: PayloadAction<{ category: string; product: Product }>
    ) {
      const { category, product } = action.payload;
      const categoryIndex = state.findIndex(
        (item) => item.category === category
      );
      if (categoryIndex > -1) {
        state[categoryIndex].products.push(product);
      }
    },
  },
});

export const { addCategory, addProduct } = productSlice.actions;
export default productSlice.reducer;