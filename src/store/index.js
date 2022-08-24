import { configureStore, createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
};
const counterSlice = createSlice({
  initialState,
  name: "slice",
  reducers: {
    addToken(state, action) {
      return {
        ...state,
        token: action.payload,
        isLoggedIn: true,
      };
    },
    logoutHandler(state){
      return {
        ...state,
        isLoggedIn:false,
        token:null
      }
    }
  },
});
export const store = configureStore({
  reducer: { cartReducer: counterSlice.reducer },
});
export const { addToken, logoutHandler } = counterSlice.actions;
