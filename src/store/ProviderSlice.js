import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  providerId: "",
  name: "",
  email: "",
  phone: "",
  isLogin: false,
  isRegister: false,
};

if (localStorage.getItem("provider")) {
  const { email, providerId, name, phone } = JSON.parse(
    localStorage.getItem("provider")
  );

  initialState = {
    providerId,
    email,
    phone,
    name,
    isLogin: true,
    isRegister: false,
  };
}

const ProviderSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    setProviderRegister: (state, action) => {
      const { providerId, email, name, phone } = action.payload;
      localStorage.setItem("provider", JSON.stringify(action.payload));
      state.providerId = providerId;
      state.email = email;
      state.name = name;
      state.phone = phone;
      state.isRegister = true;
      state.isLogin = false;
    },
    setProviderLogin: (state, action) => {
      const { providerId, email, name, phone } = action.payload;
      localStorage.setItem("provider", JSON.stringify(action.payload));
      state.providerId = providerId;
      state.email = email;
      state.name = name;
      state.phone = phone;
      state.isLogin = true;
      state.isRegister = false;
    },
    setProviderLogout: (state) => {
      localStorage.removeItem("provider");
      state.providerId = "";
      state.email = "";
      state.phone = "";
      state.name = "";
      state.isLogin = false;
      state.isRegister = false;
    },
  },
});

export const { setProviderRegister, setProviderLogin, setProviderLogout } =
  ProviderSlice.actions;

export default ProviderSlice.reducer;
