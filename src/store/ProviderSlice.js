import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  providerId: "",
  firstName: "",
  email: "",
  phone: "",
  isLogin: false,
};

if (localStorage.getItem("provider")) {
  const { email, providerId, firstName, phone } = JSON.parse(
    localStorage.getItem("provider")
  );

  initialState = {
    providerId,
    email,
    phone,
    isLogin: true,
    firstName,
  };
}

const ProviderSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    // setProviderRegister: (state, action) => {
    //   const { providerId, email, firstName, phone } = action.payload;
    //   localStorage.setItem("provider", JSON.stringify(action.payload));
    //   state.providerId = providerId;
    //   state.isRegister = true;
    //   state.email = email;

    //   state.firstName = firstName;
    //   state.phone = phone;
    // },
    setProviderLogin: (state, action) => {
      const { providerId, email, firstName, phone } = action.payload;
      localStorage.setItem("provider", JSON.stringify(action.payload));
      state.providerId = providerId;
      state.isLogin = true;
      state.email = email;
      state.firstName = firstName;
      state.phone = phone;
    },
    setProviderLogout: (state, action) => {
      localStorage.clear();
      state.providerId = "";
      state.email = "";
      state.phone = "";
      state.firstName = "";
      state.isLogin = false;
    },
  },
});

export const { setProviderLogout, setProviderLogin } = ProviderSlice.actions;

export default ProviderSlice.reducer;
