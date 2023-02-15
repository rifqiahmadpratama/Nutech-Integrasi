import { configureStore } from "@reduxjs/toolkit";

import LoginReducer from "./Slice/LoginSlice";
import RegisterReducer from "./Slice/RegisterSlice";

export default configureStore({
  reducer: {
    Login: LoginReducer,
    Register: RegisterReducer,
  },
});
