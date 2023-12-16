import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get5DaysForecast, getCityData } from "../Store/Slices/WeatherSlice";
import WeatherDetails from "./WeatherDetails";
import Forecast from "./Forecast";
import { SphereSpinner } from "react-spinners-kit";
import Form from "./Form";
import ToggleBtn from "./ToggleBtn";

function Weather() {
      //redux states
      const {
        citySearchData,
        citySearchLoading,
        forecastData,
        forecastLoading,
        forecastError,
      } = useSelector((state) => state.Weather);

      //main loading on UI
      const [loadings, setLoadings] = useState(true);

      //check if any redux loading is still true
      const allLoadings = [citySearchLoading, forecastLoading];
      useEffect(() => {
        const isAnyChildLoading = allLoadings.some((state) => state);
        setLoadings(isAnyChildLoading);
      }, [allLoadings]);

      const [city, setCity] = useState("Lucknow");
      const [unit, setUnit] = useState("metric"); //metric = C and imperial = F
      const dispatch = useDispatch();

      //fetch data
      const fetchData = () => {
        dispatch(
          getCityData({
            city,
            unit,
          })
        ).then((res) => {
          // console.log(res);
          if (!res.payload.error) {
            dispatch(
              get5DaysForecast({
                lat: res.payload.data.coord.lat,
                lon: res.payload.data.coord.lon,
                unit,
              })
            ).then((res) => {
              // console.log(res);
            });
          }
        });
      };

      //initial render
      useEffect(() => fetchData(), [unit]);
      //provide unit in the useEffect dependency array. So, whenever th eunit toggles, useEffect will run fetchData

      //on Search Submit form, we will set loading be true and then call our fetchData function
      const handleCitySearch = (e) => {
        e.preventDefault();
        setLoadings(true);
        fetchData();
      };

      const toggleUnit = () => {
        setLoadings(true);
        setUnit(unit === "metric" ? "imperial" : "metric");
      };

      return (
            <div className="w-full h-[100vh] bg-gradient-to-b from-[#2493DF] from-10% to-[#A2ABBA] grid place-items-center py-9">
              {/* center box */}
                <div className="w-[80%] h-[100%] sm:w-[60%] border-2 border-white rounded-lg shadow-md shadow-white px-4 py-8 flex flex-col justify-between">
                    {/* search box */}
                    <Form city={city} setCity={setCity} handleCitySearch={handleCitySearch} loadings={loadings}/>

                    {/* weather and forecast details */}
                    <div className="w-full bg-white rounded h-[92%] px-4 py-4 mt-2">
                        {/* current weather heading */}
                        <ToggleBtn toggleUnit={toggleUnit} unit={unit}/>

                        { loadings ? (
                            <div className="h-[80%] grid place-items-center"> 
                                <SphereSpinner loadings={loadings} color="#2fa5ed" size={50}/>
                            </div>
                          ) : (
                            <>
                              {
                                citySearchData && citySearchData.error ? (
                                  <div>
                                      {citySearchData.error}
                                  </div>
                                ) : (
                                  <>
                                    { forecastError ? (
                                      <div>{forecastError}</div>
                                     ) : (
                                      <>
                                        <WeatherDetails citySearchData={citySearchData}/>
                                        <Forecast forecastData={forecastData}/>
                                      </>
                                    )}
                                  </>
                                )
                              }
                          </>
                        )}
                    </div>
                </div>
            </div>
      );
}

export default Weather;

//getCityData
//response contains type, payload and meta data
//payload contains data and error

//get5DaysForecast
//response contains type, payload and meta data
//payload contains city{coord{lat, lon}, country, id, name, population, sunrise, sunset,timezone}, cnt, cod, list[clouds{all}, dt, dt_txt, main{feels_like,grnd_level,humidity,pressure, sea_level, temp, temp_kf, temp_max, temp_min},pop,sys{pod}, visibility, weather[description,icon,id,main],wind{deg, gust, speed}]
