import { configureStore } from "@reduxjs/toolkit";
import WeatherReducer from "./Slices/WeatherSlice";

export const store = configureStore({
      reducer : {
        Weather : WeatherReducer,
      }
})