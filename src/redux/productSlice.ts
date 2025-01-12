import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  name: string;
  price: number;
  brand: string;
  image?: string;
}

interface PriceInfo {
  price: number;
  discount: number;
  discountType: "percentage" | "fixed";
}

interface Variant {
  option: string;
  values: string[];
}

interface CombinationType {
}

interface ProductData {
  description: Product & { category: string };
  variants: Variant[];
  combinations: CombinationType[];
  priceInfo: PriceInfo;
}

interface Category {
  category: string;
  products: ProductData[];
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
    addProduct(state, action: PayloadAction<ProductData>) {
      const { description } = action.payload;
      const { category } = description;

      const categoryIndex = state.findIndex(
        (item) => item.category === category
      );

      if (categoryIndex > -1) {
        state[categoryIndex].products.push(action.payload);
      } else {
        state.push({ category, products: [action.payload] });
      }
    },
  },
});

export const { addCategory, addProduct } = productSlice.actions;
export default productSlice.reducer;