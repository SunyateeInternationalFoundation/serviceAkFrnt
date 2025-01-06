import { configureStore } from "@reduxjs/toolkit";
import ProviderSlice from "./ProviderSlice";
const store = configureStore({
  reducer: {
    provider: ProviderSlice,
  },
});

export default store;
