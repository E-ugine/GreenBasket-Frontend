import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all products
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch("http://localhost:3000/products");
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
});

// Fetch a single product by ID
export const fetchProduct = createAsyncThunk("products/fetchProduct", async (id) => {
  const response = await fetch(`http://localhost:3000/products/${id}`);
  if (!response.ok) throw new Error("Product not found");
  return response.json();
});

const productSlice = createSlice({
  name: "products",
  initialState: { 
    items: [],  // Stores all products
    product: null,  // Stores a single product
    loading: false, 
    error: null 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      // Fetch a single product
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
