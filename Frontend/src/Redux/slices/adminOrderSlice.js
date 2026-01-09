import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

// fetch all orders (admin only)

export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAllOrders",
  async (_, {rejectWithValue}) => {
    try {
       const response = await axios.get(`${API_URL}/api/admin/orders`, {
         headers: {
           Authorization: USER_TOKEN,
         },
       });
       return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong")

    }
   
  }
);

// Update orders delivery status (admin only)

export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateStatus",
  async ({id, status} ,{rejectWithValue}) => {
    try {
       const response = await axios.put(`${API_URL}/api/admin/orders/${id}`, {status}, {
         headers: {
           Authorization: USER_TOKEN,
         },
       });
       return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong")

    }
   
  }
);
// Delete orders (admin only)

export const deleteOrder = createAsyncThunk(
  "adminOrders/deleteOrder",
  async (id ,{rejectWithValue}) => {
    try {
        await axios.delete(`${API_URL}/api/admin/orders/${id}`, {
         headers: {
           Authorization: USER_TOKEN,
         },
       });
       return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong")

    }
   
  }
);

const adminOrderSlice = createSlice({
  name:"adminOrder",
  initialState:{
    orders:[],
    totalOrders:0,
    totalSales:0,
    loading:false,
    error:null,
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      // Fetch all orders
      .addCase(fetchAllOrders.pending , (state)=>{
        state.loading = true;
        state.error= null;
      })
      .addCase(fetchAllOrders.fulfilled , (state, action)=>{
        state.loading = false;
        state.orders= action.payload
        state.totalOrders = action.payload.length

        // Calculate the total Sales
        const totalSales = action.payload.reduce((acc,order )=>
           acc + order.totalPrice, 0)
        state.totalSales = totalSales;
      })
      .addCase(fetchAllOrders.rejected , (state,action)=>{
        state.loading = false;
        state.error= action.payload
      })
      // Update  orders
      .addCase(updateOrderStatus.fulfilled , (state, action)=>{
        state.loading = false;
        const updatedOrder = action.payload.updatedOrder;
         const index = state.orders.findIndex(
           (order) => order._id === updatedOrder._id
         );
         if(index !== -1){
           state.orders[index] = updatedOrder;
         }
      })
      // Delete order
      .addCase(deleteOrder.pending , (state)=>{
        state.loading = true;
        state.error= null;
      })
      .addCase(deleteOrder.fulfilled , (state, action)=>{
        state.loading = false;
        state.orders = state.orders.filter((order)=> order._id !== action.payload)
        
      })
      .addCase(deleteOrder.rejected , (state,action)=>{
        state.loading = false;
        state.error= action.payload
      })
  }

})

export default adminOrderSlice.reducer