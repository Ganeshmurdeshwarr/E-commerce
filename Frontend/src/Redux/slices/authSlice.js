import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"


// Retrieve user info and token from localStorage

const userFormStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;


// Check for an existing guest ID in the localstorage or generate a new one

const initialGuestId = localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;

localStorage.setItem("guestId", initialGuestId);

// Initial state 

const initialState = {
  user: userFormStorage,
  guestId: initialGuestId,
  loading: true,
  error:null,
}

export const loadUserFromToken = createAsyncThunk(
  "auth/loadUserFromToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) return rejectWithValue("No token");

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("userInfo", JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      return rejectWithValue("Session expired");
    }
  }
);

// Async Thunk for User Login

export const loginUser = createAsyncThunk("auth/loginUser", async(userData , {rejectWithValue})=>{

  try {
  const  response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, userData);

  localStorage.setItem("userInfo", JSON.stringify(response.data.user));
  localStorage.setItem("userToken", response.data.token);

    return response.data.user  // Return the user object from the response

  } catch (error) {
    return rejectWithValue(error.response.data)
  }

})

// Async Thunk User Registration

export const registerUser = createAsyncThunk("auth/registerUser", async(userData , {rejectWithValue})=>{

  try {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
    userData
  );

  localStorage.setItem("userInfo", response.data.user);
  localStorage.setItem("userToken", response.data.token);

    return response.data.user  // Return the user object from the response

  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    logout:(state)=>{
      state.user =null;
      state.guestId = `guest_${new Date().getTime()}`; // Reset guest ID on logout
      localStorage.removeItem("userInfo")
      localStorage.removeItem("userToken")
      localStorage.setItem("guestId" , state.guestId) // Set new Guest ID in LS
    },
    generateNewGuestId :(state)=>{
      state.guestId = `guest_${new Date().getTime()}`
      localStorage.setItem("guestId", state.guestId); 
    }
  },
  extraReducers:(builder)=>{
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(loadUserFromToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUserFromToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loadUserFromToken.rejected, (state) => {
        state.user = null;
        state.loading = false;
      });

  }
})

export const { logout , generateNewGuestId} = authSlice.actions;
export default authSlice.reducer