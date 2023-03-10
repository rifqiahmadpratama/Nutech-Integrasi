import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const postLogin = createAsyncThunk("Login/postLogin", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3200/user/login",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    if (response.data.statusCode === 201) {
      toast.success("Login Success. Welcome " + response.data.data.name, {
        autoClose: 2000,
        toastId: "successLogin",
      });
      console.log("Cek data response = ", response.data.data);
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("refreshToken", response.data.data.refershToken);
      localStorage.setItem("id", response.data.data.id);
      localStorage.setItem("name", response.data.data.name);
    } else {
      toast.warning(response.data.message, {
        autoClose: 2000,
        toastId: "warningLogin",
      });
    }

    return response.data;
  } catch (error) {
    toast.warning(error.response.data.message, {
      autoClose: 2000,
      toastId: "errorLogin",
    });
  }
});

const LoginSlice = createSlice({
  name: "Login",
  initialState: {
    isLoading: false,
    isError: null,
    status: "idle",
    Login: [],
  },
  extraReducers: {
    [postLogin.pending]: (state) => {
      state.isLoading = true;
      state.status = "loading";
    },
    [postLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.Login = action.payload;
      state.status = "success";
      state.statusCode = action.payload.statusCode;
    },
    [postLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
      state.status = "failed";
    },
  },
});

export default LoginSlice.reducer;
