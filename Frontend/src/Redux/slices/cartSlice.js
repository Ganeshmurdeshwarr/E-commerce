import {
  createSlice,
  createAsyncThunk,

} from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to load cart from localStorage

export const loadCartFromLS = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : { product: [] };
};

// Helper function to save cart back to LS

const saveCartToLS = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch cart for user or guest

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/`,
        {
          params: { userId, guestId },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Add an item to the cart for user or guest

export const addItemToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity, size, color, guestId, userId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/`,
        {
          productId,
          quantity,
          size,
          color,
          guestId,
          userId,
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Update the  quantity of an item in the cart

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    { productId, quantity, size, color, guestId, userId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/`,
        { productId, quantity, size, color, guestId, userId }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);


// remove item from the   cart

export const removeFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async ({ productId, size, color, guestId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_BACKEND_URL}/api/cart/`,
        data: { productId, size, color, guestId, userId },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Merge guest cart into user cart

export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ guestId , user}, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        { guestId, user },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );        
    
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name:"cart",
  initialState:{
    cart: loadCartFromLS(),
    loading:false,
    error:null,

  },
  reducers:{
    clearCart:(state)=>{
      state.cart ={ products:[] };
      localStorage.removeItem("cart")
    }
  },
  extraReducers:(builder)=>{
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        (state.loading = false), (state.cart = action.payload);
        saveCartToLS(action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload?.message || "Failed to fetch cart");
      })
      // Add to cart
      .addCase(addItemToCart.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        (state.loading = false), (state.cart = action.payload);
        saveCartToLS(action.payload);
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload?.message || "Failed to add to cart");
      })
      
      // update Cart Item Quantity 
      .addCase(updateCartItemQuantity.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        (state.loading = false), (state.cart = action.payload);
        saveCartToLS(action.payload);
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload?.message || "Failed to add to cart");
      })

      // remove item from Cart 
      .addCase(removeFromCart.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        (state.loading = false), (state.cart = action.payload);
        saveCartToLS(action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload?.message || "Failed to remove item from cart")
      })
      // To merge cart  
      .addCase(mergeCart.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        (state.loading = false), (state.cart = action.payload);
        saveCartToLS(action.payload);
      })
      .addCase(mergeCart.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload?.message || "Failed to merge cart")
      })
  }
})

export const { clearCart } = cartSlice.actions
export default cartSlice.reducer
