import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {hostName, apiKey} from "../../config/config"

//getCityData API call
export const getCityData = createAsyncThunk("city", async(obj) => {
    try{
        const request = await axios.get(`${hostName}/data/2.5/weather?q=${obj.city}&units=${obj.unit}&appId=${apiKey}`);
        const response = await request.data;
        return {
            data : response,
            error : null,
        }
    } catch(err){
         return {
            data : null,
            error : err.response.data.message,
         }
    }
})


//get 5 days forecast of the provided city
export const get5DaysForecast = createAsyncThunk("5Days", async(obj) => {
    const request = await axios.get(`${hostName}/data/2.5/forecast?lat=${obj.lat}&lon=${obj.lon}&units=${obj.unit}&appId=${apiKey}`);
    const response = await request.data;
    return response;
})

const WeatherSlice = createSlice({
    name : "weatherApp",
    initialState:{
        citySearchData : null,
        citySearchLoading: false,
        forecastData : null,
        forecastLoading : false,
        forecastError : null,
    },
    extraReducers : (builder) => {
              builder
              //getCityData
                    .addCase(getCityData.pending, (state) => {
                        state.citySearchLoading = true,
                        state.citySearchData = null
                    })
                    .addCase(getCityData.fulfilled, (state,action) => {
                        state.citySearchData = action.payload,
                        state.citySearchLoading = false
                    })
                //5DaysForecast
                    .addCase(get5DaysForecast.pending, (state) => {
                        state.forecastLoading = true,
                        state.forecastData = null,
                        state.forecastError = null
                    })
                    .addCase(get5DaysForecast.fulfilled, (state,action) => {
                        state.forecastLoading = false,
                        state.forecastData = action.payload,
                        state.forecastError = null
                    })
                    .addCase(get5DaysForecast.rejected, (state,action) => {
                        state.forecastLoading = false,
                        state.forecastData = null,
                        state.forecastError = action.error.message
                    })
    }
})

export default WeatherSlice.reducer;

//In case of get5DaysForecast, we need to write rejected case bcz we are not using try catch block for hitting API. 
//So in case of any error we need to write rejected case and populate error in the error state