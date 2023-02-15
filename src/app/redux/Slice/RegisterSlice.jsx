import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const postRegister = createAsyncThunk(
  "Register/postRegister",
  async (dataUser) => {
    try {
      const response = await axios.post(
        "http://localhost:3200/user/register",
        JSON.stringify(dataUser),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (response.data.statusCode === 201) {
        toast.success("Register Success. wait a few seconds", {
          autoClose: 2000,
          toastId: "successRegister",
        });
      } else {
        toast.warning(response.data.message, {
          autoClose: 2000,
          toastId: "warningRegister",
        });
      }

      return response.data;
    } catch (error) {
      toast.warning(error.response.data.message, {
        autoClose: 2000,
        toastId: "errorRegister",
      });
    }
  }
);

const RegisterSlice = createSlice({
  name: "Register",
  initialState: {
    isLoading: false,
    isError: null,
    status: "idle",
    Register: [],
  },
  extraReducers: {
    [postRegister.pending]: (state) => {
      state.isLoading = true;
      state.status = "loading";
    },
    [postRegister.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.Register = action.payload;
      state.status = "success";
    },
    [postRegister.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
      state.status = "failed";
    },
  },
});

export default RegisterSlice.reducer;
